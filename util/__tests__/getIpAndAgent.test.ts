import { expect, test } from '@jest/globals';
import { getIpAndAgent } from '../functions/getIpAndAgent';

test('missing header', () => {
  // @ts-expect-error
  expect(getIpAndAgent(null)).toStrictEqual(
    'unknown browser @ unknown location',
  );
});
