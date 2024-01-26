import { expect, test } from '@jest/globals';
import { checkedMessageLength } from '../functions/checkedMessageLength';

test('empty message', () => {
  expect(checkedMessageLength('    ', 5)).toBeFalsy();
});

test('message too long', () => {
  expect(checkedMessageLength('123456', 5)).toBeFalsy();
});

test('message length correct', () => {
  expect(checkedMessageLength('12345', 5)).toBeTruthy();
});
