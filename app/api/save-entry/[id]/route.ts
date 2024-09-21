import { createKysely } from '@vercel/postgres-kysely';
import { Generated, sql } from 'kysely';

interface EditsTable {
  id: Generated<string>;
  user_id: string;
  diff: [[number, number, string]];
}

interface Database {
  edits: EditsTable;
}

const db = createKysely<Database>();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as [[number, number, string]];
  db.insertInto('edits')
    .values({
      user_id: params.id,
      diff: sql`cast (${JSON.stringify(res)} as jsonb)`,
    })
    .execute();
  return new Response();
}
