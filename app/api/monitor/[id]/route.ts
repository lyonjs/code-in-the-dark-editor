import { createKysely } from '@vercel/postgres-kysely';
import { Generated } from 'kysely';
import { applyPatch } from 'fast-myers-diff';

interface EditsTable {
  id: Generated<string>;
  user_id: string;
  diff: [[number, number, string]];
  timestamp: Date;
}

interface Database {
  edits: EditsTable;
}

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
