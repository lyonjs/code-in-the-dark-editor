import { createClient } from '@vercel/postgres';
import { createKysely } from '@vercel/postgres-kysely';
import { applyPatch } from 'fast-myers-diff';
import { Database } from '../../../../models/database';

export const runtime = 'edge';

const MAXIMUM_POOLING_IN_MS = 20 * 60 * 1000;

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
      client.on('notification', async (_message) => {
        const html = await getHtml(params.id);
        controller.enqueue(encoder.encode(html));
      });

      const html = await getHtml(params.id);
      controller.enqueue(encoder.encode(html));

      // Stop connexion after long period.
      setTimeout(() => {
        controller.close();
        client.end();
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

async function getHtml(id: string) {
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
