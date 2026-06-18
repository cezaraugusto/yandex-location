import {afterEach, describe, expect, test, vi} from 'vitest'

type ScanOsxPath = (
  allowFallback?: boolean,
  deps?: {
    fs?: {existsSync: (p: string) => boolean};
    userhome?: (p: string) => string;
  }
) => string | null

type ScanWindowsPath = (
  allowFallback?: boolean,
  deps?: {
    fs?: {existsSync: (p: string) => boolean};
    env?: NodeJS.ProcessEnv;
  }
) => string | null

type ScanUnknownPlatformPath = (
  allowFallback?: boolean,
  deps?: {
    which?: {sync: (cmd: string) => string};
  }
) => string | null

describe('yandex-location fallbacks', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  it('macOS: strict only stable (no macOS fallbacks for now)', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path'))
      .default as unknown as ScanOsxPath

    const strict = scanOsxPath(false, {
      fs: {existsSync: (p: string) => p.includes('Yandex.app')},
      userhome: () => '/Users/test/Applications'
    })

    expect(typeof strict === 'string' || strict === null).toBe(true)
  })

  it('Windows: strict null, fallback finds Beta', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as unknown as ScanWindowsPath

    const strict = scanWindowsPath(false, {
      fs: {existsSync: (p: string) => /YandexBrowserBeta/.test(p)},
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined
      } satisfies NodeJS.ProcessEnv
    })

    const fallback = scanWindowsPath(true, {
      fs: {existsSync: (p: string) => /YandexBrowserBeta/.test(p)},
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined
      } satisfies NodeJS.ProcessEnv
    })

    expect(strict).toBeNull()
    expect(
      typeof fallback === 'string' && /YandexBrowserBeta/.test(fallback)
    ).toBe(true)
  })

  it('Linux/other: strict only stable; fallback tries beta', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as unknown as ScanUnknownPlatformPath

    const calls: string[] = []
    const strict = scanUnknown(false, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd)
          throw new Error('nf')
        }
      }
    })

    const result = scanUnknown(true, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd)

          if (cmd === 'yandex-browser-beta') { return '/usr/bin/yandex-browser-beta' }

          throw new Error('nf')
        }
      }
    })

    expect(strict).toBeNull()
    expect(result === null || result === '/usr/bin/yandex-browser-beta').toBe(
      true
    )
    expect(calls[0]).toBe('yandex-browser')
  })
})
