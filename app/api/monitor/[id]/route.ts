import { createClient } from '@vercel/postgres';
import { createKysely } from '@vercel/postgres-kysely';
import { applyPatch } from 'fast-myers-diff';
import { Database } from '../../../../models/database';
import _ from 'lodash';

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
          await queueHtml(params.id, controller);
        }, TIME_THROTTLE_NOTIFICATIONS_IN_MS)
      );

      await queueHtml(params.id, controller);

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

async function queueHtml(
  id: string,
  controller: ReadableStreamDefaultController<any>
) {
  const html = await getAndReconstructHtml(id);
  controller.enqueue(encoder.encode(html));
}

async function getAndReconstructHtml(id: string) {
  const diffs = await db
    .selectFrom('edits')
    .select('diff')
    .where('user_id', '=', id)
    .orderBy('n asc')
    .execute();
  let html = '';
  for (const diff of diffs.map(({ diff }) => diff)) {
    html = reconstructDiffs({
      diff: diff,
      originalHtml: html,
    });
  }
  return html;
}

function reconstructDiffs({
  diff,
  originalHtml,
}: {
  originalHtml: string;
  diff: [[number, number, string]];
}) {
  const appliedPatches = applyPatch(originalHtml, diff);
  const patches = [...appliedPatches];
  return patches.join('');
}
