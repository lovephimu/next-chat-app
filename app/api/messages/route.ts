import {
  createMessage,
  deleteMessagesById,
  Error,
  getMessages,
  Message,
} from '@/database/database';
import { getIpAndAgent } from '@/util/functions/getIpAndAgent';
import { getOldMessageIds } from '@/util/functions/getOldMessageIds';
import { NextRequest, NextResponse, userAgentFromString } from 'next/server';
import Pusher from 'pusher';
import { z } from 'zod';

type MessageResponseBodyGet = { messages: Message[] } | Error;
type MessageResponseBodyPost = { message: Message } | Error;

// Schema for checking content

const messageSchema = z.object({
  messageText: z.string(),
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
  // Server side browser an ip fetching

  const userSignature = getIpAndAgent(request);

  // Ensure that environment variables are defined
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    return NextResponse.json(
      {
        error: 'Pusher environment variables are not properly set.',
      },
      { status: 400 },
    );
  }

  const pusher = new Pusher({
    appId: appId,
    key: key,
    secret: secret,
    cluster: cluster,
    useTLS: true,
  });

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

  const message = await createMessage(result.data.messageText, userSignature);

  if (!message) {
    return NextResponse.json(
      {
        error: 'Error creating the new message',
      },
      { status: 500 },
    );
  }

  // Trigger Pusher event (new)
  await pusher.trigger('earthy-dawn-65', 'new-message', {
    message: message,
  });

  return NextResponse.json({
    message: message,
  });
}
