import { expect, test, describe } from 'vitest';
import yandexLocation from '../src/index';

describe('yandex-location module', () => {
  test('returns string or null', () => {
    const res = yandexLocation();
    expect(typeof res === 'string' || res === null).toBe(true);
  });
});
