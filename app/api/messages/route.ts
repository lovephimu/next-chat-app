import {
  createMessage,
  deleteMessagesById,
  Error,
  getMessages,
  Message,
} from '@/database/database';
import { getOldMessageIds } from '@/util/functions/getOldMessageIds';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type MessageResponseBodyGet = { messages: Message[] } | Error;
type MessageResponseBodyPost = { message: Message } | Error;

const messageSchema = z.object({
  messageText: z.string(),
  chatUser: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MessageResponseBodyGet>> {
  const messages = await getMessages();
  return NextResponse.json({ messages: messages });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MessageResponseBodyPost>> {
  const body = await request.json();

  // 1. Gather user input
  // zod tests to check if body matches schema

  const result = messageSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error);
    return NextResponse.json(
      {
        error: 'Data is incorrect or incomplete.',
      },
      { status: 400 },
    );
  }

  // 2. Check database, see how many messages there are

  const messages = await getMessages();

  // 3. Check if there are more than 5 messages (messageLimit) , if so delete the oldest

  const messageLimit = 5;

  if (messages?.length >= messageLimit) {
    const oldMessageIds = getOldMessageIds(messageLimit, messages);

    await Promise.all(
      oldMessageIds.map(async (oldId) => deleteMessagesById(oldId)),
    );
  }

  // 4. Save new message

  const message = await createMessage(
    result.data.messageText,
    result.data.chatUser,
  );

  if (!message) {
    return NextResponse.json(
      {
        error: 'Error creating the new message',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: message,
  });
}
