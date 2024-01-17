import { Error, getMessageById, Message } from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';

type MessageResponseBodyGet = { message: Message } | Error;

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<MessageResponseBodyGet>> {
  // get ID from params

  const messageId = Number(params.messageId);

  // check Id

  if (!messageId) {
    return NextResponse.json(
      {
        error: 'Message ID not valid',
      },
      { status: 400 },
    );
  }

  // query message by id

  const message = await getMessageById(messageId);

  if (!message) {
    return NextResponse.json(
      {
        error: 'Message not found',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: message });
}
