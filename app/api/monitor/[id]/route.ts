import { createKysely } from '@vercel/postgres-kysely';
import { applyPatch } from 'fast-myers-diff';
import { Database } from '../../../../models/database';

const REFRESH_RATE_IN_MS = 500;
const MAXIMUM_POOLING_IN_MS = 20 * 60 * 1000;

const db = createKysely<Database>();

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const diffs = await db
    .selectFrom('edits')
    .select('diff')
    .where('user_id', '=', params.id)
    .orderBy('n asc')
    .execute();

  let html = '';
  for (const diff of diffs.map(({ diff }) => diff)) {
    html = reconstructDiffs({
      diff: diff,
      originalHtml: html,
    });
  }
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      let previousHtml = '';

      for (let i = 0; i < MAXIMUM_POOLING_IN_MS / REFRESH_RATE_IN_MS; i++) {
        const diffs = await db
          .selectFrom('edits')
          .select('diff')
          .where('user_id', '=', params.id)
          .orderBy('n asc')
          .execute();

        let html = '';
        for (const diff of diffs.map(({ diff }) => diff)) {
          html = reconstructDiffs({
            diff: diff,
            originalHtml: html,
          });
        }
        if (previousHtml === html) {
          await delay(REFRESH_RATE_IN_MS);

          continue;
        }
        previousHtml = html;
        controller.enqueue(encoder.encode(html));
        await delay(REFRESH_RATE_IN_MS);
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
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
