import { expect, test } from '@jest/globals';
import { getOldMessageIds } from '../functions/getOldMessageIds';

test('get all id that exceed message limit 5', () => {
  const inputMessages = [
    {
      id: 128,
      messageText: 'just curious too',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 123,
      messageText: 'cool',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 124,
      messageText: 'so is this still up? :D',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 125,
      messageText: 'phew. :)',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 126,
      messageText: 'nice',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 127,
      messageText: 'just curious',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
  ];

  const testLimit = 5;

  expect(getOldMessageIds(testLimit, inputMessages)).toStrictEqual([123, 124]);
});

test('get all id that exceed message limit 5', () => {
  const inputMessages = [
    {
      id: 123,
      messageText: 'cool',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 124,
      messageText: 'so is this still up? :D',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
    {
      id: 125,
      messageText: 'phew. :)',
      chatUser: 'Chrome @ xx.xx.xx.xx',
    },
  ];

  const testLimit = 5;

  expect(getOldMessageIds(testLimit, inputMessages)).toStrictEqual([]);
});
