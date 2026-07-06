import {describe, expect, test} from 'vitest'

import yandexLocation, {getInstallGuidance} from '../src/index'

describe('yandex-location module', () => {
  it('returns string or null', () => {
    const res = yandexLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Yandex for Testing (recommended)',
          command: 'npx extension install yandex'
        },
        {
          summary: 'Install Yandex',
          command: 'npx extension install yandex-stable'
        }
      ]
    })

    expect(msg).toMatch(
      new RegExp(
        '1\\) Install Yandex for Testing \\(recommended\\)\\n' +
          ' {3}npx extension install yandex'
      )
    )
    expect(msg).toMatch(
      /2\) Install Yandex\n {3}npx extension install yandex-stable/
    )
    expect(msg).not.toMatch(/Install Yandex Browser from the official site/)
    expect(msg).toMatch(/We couldn't find a Yandex browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
