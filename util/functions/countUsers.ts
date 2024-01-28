import { Message } from '@/database/database';

export type BrowserUsage = {
  name: string;
  count: number;
};

export function countUsers(messages: Message[]): BrowserUsage[] {
  messages.forEach((message) => console.log('this is a message'));

  // 1. get the actual Names without Ips

  const count = messages.map((message) => {
    const newUserName = message.chatUser.split(' @ ');
    return newUserName[0];
  });

  // 2. Count the occurences

  const countTotals: Record<string, number> = {};

  count.forEach((countName) => {
    countTotals[countName] = (countTotals[countName] || 0) + 1;
  });

  // 3. Format counts into an array for D3 diagram

  const result: BrowserUsage[] = Object.keys(countTotals).map((key) => {
    return { name: key, count: countTotals[key] };
  });
  console.log(result);

  return result;
}
