import { Sql } from 'postgres';

// Table setup for migration and deployment

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE visiting_agents (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    agent_name varchar(120) NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE visiting_agents
  `;
}
