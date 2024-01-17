import { cache } from 'react';
import { sql } from './connect';

// chat types

export type Message = {
  id: number;
  messageText: string;
  chat_user: string;
};
