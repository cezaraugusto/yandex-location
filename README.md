[npm-version-image]: https://img.shields.io/npm/v/yandex-location.svg?color=ffcc00
[npm-version-url]: https://www.npmjs.com/package/yandex-location
[npm-downloads-image]: https://img.shields.io/npm/dm/yandex-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/yandex-location
[action-image]: https://github.com/cezaraugusto/yandex-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/yandex-location/actions

> Approximates the current location of the Yandex browser across platforms.

# yandex-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Yandex" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@9ef31f005a0192907d9f6405838e43776aca2124/browser_logos/svg/yandex.svg" width="10.5%" />

* By default checks only `stable`. Optionally can cascade to `beta`.
* Supports macOS / Windows / Linux
* Works both as an ES module or CommonJS

## Support table

This table lists the default locations where Yandex is typically installed for each supported platform and channel. By default, only the Stable channel is checked. When fallback is enabled, the package checks these paths (in order) and returns the first one found.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="1" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Yandex (Stable)</td>
      <td>
        <ul>
          <li><code>/Applications/Yandex.app/Contents/MacOS/Yandex</code></li>
          <li><code>~/Applications/Yandex.app/Contents/MacOS/Yandex</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="2" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Yandex (Stable)</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Yandex\YandexBrowser\Application\browser.exe</code></li>
          <li><code>%PROGRAMFILES%\Yandex\YandexBrowser\Application\browser.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Yandex\YandexBrowser\Application\browser.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Yandex Beta</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Yandex\YandexBrowserBeta\Application\browser.exe</code></li>
          <li><code>%PROGRAMFILES%\Yandex\YandexBrowserBeta\Application\browser.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Yandex\YandexBrowserBeta\Application\browser.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="2" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Yandex (Stable)</td>
      <td>
        <ul>
          <li><code>yandex-browser</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Yandex Beta</td>
      <td>
        <ul>
          <li><code>yandex-browser-beta</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## Usage

**Via Node.js (strict by default):**

```js
import yandexLocation from "yandex-location";

// Strict (Stable only)
console.log(yandexLocation());
// => "/Applications/Yandex.app/Contents/MacOS/Yandex" or null

// Enable fallback (Stable / Beta)
console.log(yandexLocation(true));
// => first found among Stable/Beta or null
```

**Via CLI:**

```bash
npx yandex-location
# Strict (Stable only)

npx yandex-location --fallback
# Enable cascade (Stable / Beta)
```

## Related projects

* [brave-location](https://github.com/cezaraugusto/brave-location)
* [chrome-location](https://github.com/cezaraugusto/chrome-location)
* [edge-location](https://github.com/cezaraugusto/edge-location)
* [firefox-location](https://github.com/cezaraugusto/firefox-location)
* [opera-location](https://github.com/cezaraugusto/opera-location)
* [vivaldi-location](https://github.com/cezaraugusto/vivaldi-location)

## License

MIT (c) Cezar Augusto.


