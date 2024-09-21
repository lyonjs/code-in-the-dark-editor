CREATE TABLE edits(
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(30),
  diff JSONB,
  n INTEGER
);