import { createKysely } from '@vercel/postgres-kysely';
import { sql } from 'kysely';
import { Database } from '../../../../models/database';

const db = createKysely<Database>();

export type RequestSaveEntry = {
  diff: [number, number, string][];
  n: number;
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
      n: res.n,
    })
    .execute();
  await sql`NOTIFY NEWENTRY`.execute(db);

  return new Response();
}
