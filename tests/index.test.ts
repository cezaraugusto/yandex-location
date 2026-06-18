import {describe, expect, test} from 'vitest'

import yandexLocation from '../src/index'

describe('yandex-location module', () => {
  it('returns string or null', () => {
    const res = yandexLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })
})
