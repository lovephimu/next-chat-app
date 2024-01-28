import { Message } from '@/database/database';
import { expect, test } from '@jest/globals';
import { countUsers } from '../functions/countUsers';

const testInput: Message[] = [
  { id: 293, messageText: 'k', chatUser: 'Mobile Safari @ ::1' },
  { id: 294, messageText: 'k', chatUser: 'Something Else @ ::1' },
  { id: 295, messageText: 'no', chatUser: 'Chrome @ ::1' },
  { id: 296, messageText: 'but', chatUser: 'Safari @ ::1' },
  { id: 297, messageText: 'nooo', chatUser: 'Opera @ ::1' },
];

test('test if only the first three browser are returned', () => {
  expect(countUsers(testInput).length).toEqual(3);
});
