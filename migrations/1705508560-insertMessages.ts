import { Message } from '@/database/database';
import { Sql } from 'postgres';

// export type Message = {
//   id: number;
//   messageText: string;
//   user: string;
// };

// Test messages

const messages: Message[] = [
  {
    id: 1,
    messageText: 'Awkward silence.',
    chatUser: 'firefox@127.0.0.1',
  },
  {
    id: 2,
    messageText: 'Awkward silence yourself.',
    chatUser: 'chrome@127.0.0.1',
  },
  {
    id: 3,
    messageText: 'Silence is something nice.',
    chatUser: 'safari@127.0.0.1',
  },
];

export async function up(sql: Sql) {
  for (const message of messages) {
    await sql`
    INSERT INTO messages
    (message_text, chat_user)
    VALUES
    (${message.messageText}, ${message.chatUser})
    `;
  }
}

export async function down(sql: Sql) {
  for (const message of messages) {
    await sql`
    DELETE FROM messages WHERE id = ${message.id}
    `;
  }
}
