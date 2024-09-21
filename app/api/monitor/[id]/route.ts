import { createKysely } from '@vercel/postgres-kysely';
import { applyPatch } from 'fast-myers-diff';
import { Database } from '../../../../models/database';

const db = createKysely<Database>();

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const diffs = await db
    .selectFrom('edits')
    .select('diff')
    .where('user_id', '=', params.id)
    .orderBy('timestamp asc')
    .execute();

  let html = '';
  for (const diff of diffs.map(({ diff }) => diff)) {
    html = reconstructDiffs({
      diff: diff,
      originalHtml: html,
    });
  }

  return new Response(`${html}`, {
    headers: {
      'Content-Type': 'text/html',
    },
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
