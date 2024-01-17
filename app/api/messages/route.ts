import { Error, getMessages, Message } from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';

type MessageResponseBodyGet = { messages: Message[] } | Error;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MessageResponseBodyGet>> {
  const messages = await getMessages();
  return NextResponse.json({ messages: messages });
}
