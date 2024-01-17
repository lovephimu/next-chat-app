import { NextRequest, NextResponse } from 'next/server';

export function GET(): NextResponse<{ messages: string }> {
  return NextResponse.json({
    messages: '/api/messages',
  });
}
