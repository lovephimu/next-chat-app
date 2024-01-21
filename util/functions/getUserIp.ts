import { headers } from 'next/headers';

export function getUserIp(header: Headers): string {
  // const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  if (ip) {
    return ip;
  } else {
    return 'unknown location';
  }
}
