import { createClient } from '@vercel/postgres';
import { createKysely } from '@vercel/postgres-kysely';
import _ from 'lodash';
import { Database } from '../../../../models/database';

export const runtime = 'edge';

const MAXIMUM_POOLING_IN_MS = 20 * 60 * 1000;
const TIME_THROTTLE_NOTIFICATIONS_IN_MS = 1000;

const db = createKysely<Database>();
const encoder = new TextEncoder();

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const client = createClient();
  await client.connect();
  // TODO : fine tune notifications
  await client.sql`LISTEN NEWENTRY`;

  const readable = new ReadableStream({
    async start(controller) {
      client.on(
        'notification',
        _.throttle(async (_message) => {
          await queueDiffs(params.id, controller);
        }, TIME_THROTTLE_NOTIFICATIONS_IN_MS)
      );

      await queueDiffs(params.id, controller);

      // Stop connexion after long period.
      setTimeout(() => {
        // try finally statement so that controller fails silently
        try {
          controller.close();
        } catch (e) {
          // pass
        }
        try {
          client.end();
        } catch (e) {
          // pass
        }
      }, MAXIMUM_POOLING_IN_MS);
    },
    cancel() {
      client.end();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function queueDiffs(
  id: string,
  controller: ReadableStreamDefaultController<any>
) {
  const diffs = await db
    .selectFrom('edits')
    .select('diff')
    .where('user_id', '=', id)
    .orderBy('n asc')
    .execute();
  const diffsArray = diffs.map(({ diff }) => diff);
  controller.enqueue(encoder.encode(JSON.stringify(diffsArray)));
}
