import { cache } from 'react';
import { sql } from './connect';

// chat types

export type Message = {
  id: number;
  messageText: string;
  chat_user: string;
};

export type Error = {
  error: string;
};

// GET messages

export const getMessages = cache(async () => {
  const messages = await sql<Message[]>`
  SELECT * FROM messages
  `;
  return messages;
});

export const getMessageById = cache(async (id: number) => {
  const [message] = await sql<Message[]>`
  SELECT * FROM messages
  WHERE id = ${id}
  `;
  return message;
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
