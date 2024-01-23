import { NextRequest, userAgentFromString } from 'next/server';

export function getIpAndAgent(request: NextRequest): string {
  const requestIp = (
    request?.headers.get('x-forwarded-for') ?? 'unknown location'
  ).split(',')[0];

  const browser = request?.headers.get('user-agent');
  const agent = browser ? userAgentFromString(browser) : null;
  const browserName = agent?.browser?.name || 'unknown browser';

  return `${browserName} @ ${requestIp}`;
}
