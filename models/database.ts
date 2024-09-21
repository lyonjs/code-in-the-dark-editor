import { Generated } from 'kysely';

export interface EditsTable {
  id: Generated<string>;
  user_id: string;
  diff: [[number, number, string]];
  timestamp: Date;
}

export interface Database {
  edits: EditsTable;
}
