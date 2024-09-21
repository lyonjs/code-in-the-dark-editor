import { Generated } from 'kysely';

export interface EditsTable {
  id: Generated<string>;
  user_id: string;
  diff: [[number, number, string]];
  n: number;
}

export interface Database {
  edits: EditsTable;
}
