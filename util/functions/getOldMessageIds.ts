import { Message } from '@/database/database';

export function getOldMessageIds(
  limit: number,
  messageArray: Message[],
): number[] {
  // sort messages by ID in ascending order 1,2,3,4,5,6,...

  const sortedMessages = [...messageArray].sort((a, b) => a.id - b.id);

  // calculate how much to delete
  const messagesToDelete = sortedMessages.length - limit;

  const oldMessageIds: number[] = [];
  if (messagesToDelete === 0) {
    oldMessageIds.push(sortedMessages[0].id);
  } else {
    for (let i = 0; i <= messagesToDelete; i++) {
      const oldMessageId = sortedMessages[i].id;
      oldMessageIds.push(oldMessageId);
    }
  }

  return oldMessageIds;
}
