import { cache } from 'react';
import { sql } from './connect';

// chat types

export type Message = {
  id: number;
  messageText: string;
  chat_user: string;
};

// GET messages

export const getMessages = cache(async () => {
  const messages = await sql<Message[]>`
  SELECT * FROM messages
  `;
  return messages;
});

// POST messages

export const createMessage = cache(
  async (messageText: string, chatUser: string) => {
    const [message] = await sql<Message[]>`
  INSERT INTO messages
  (message_text, chat_user)
  VALUES (${messageText}, ${chatUser})
  RETURNING id, message_text, chat_user
  `;
  },
);
