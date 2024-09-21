import { createKysely } from '@vercel/postgres-kysely';
import { Generated, sql } from 'kysely';

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

export type RequestSaveEntry = {
  diff: [number, number, string][];
  timestamp: Date;
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as RequestSaveEntry;
  db.insertInto('edits')
    .values({
      user_id: params.id,
      diff: sql`cast (${JSON.stringify(res.diff)} as jsonb)`,
      timestamp: res.timestamp,
    })
    .execute();
  return new Response();
}
