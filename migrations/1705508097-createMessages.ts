import { Sql } from 'postgres';

// Table setup for migration and deployment

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE messages (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message_text varchar NOT NULL,
    chat_user varchar NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE messages
  `;
}
