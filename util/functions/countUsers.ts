import { Message } from '@/database/database';

export type BrowserUsage = {
  name: string;
  count: number;
};

export function countUsers(messages: Message[]): BrowserUsage[] {
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

  if (result.length > 3) {
    // Set desired length
    const desiredLength = Math.min(3, result.length);

    result.sort((a, b) => b.count - a.count);
    // Create a new array with the desired length
    const trimmedArray = result.slice(0, desiredLength);

    return trimmedArray;
  }

  return result;
}
