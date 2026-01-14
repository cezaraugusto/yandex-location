#!/usr/bin/env node
'use strict';

const api = require('./dist/index.cjs');
const locateYandex = api.default || api;
const getYandexVersion = api.getYandexVersion;
const getInstallGuidance = api.getInstallGuidance;

const argv = process.argv.slice(2);
const allowFallback = argv.includes('--fallback') || argv.includes('-f');
const printBrowserVersion =
  argv.includes('--yandex-version') || argv.includes('--browser-version');
const allowExec = argv.includes('--allow-exec');

try {
  const yandexPath =
    (typeof locateYandex === 'function' && locateYandex(allowFallback)) ||
    (typeof locateYandex === 'function' && locateYandex(true)) ||
    null;

  if (!yandexPath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Yandex Browser not found.';
    console.error(guidance);
    process.exit(1);
  }

  if (printBrowserVersion && typeof getYandexVersion === 'function') {
    const v = getYandexVersion(yandexPath, { allowExec });
    if (!v) {
      console.log('');
      process.exit(2);
    }
    console.log(String(v));
    process.exit(0);
  }

  console.log(String(yandexPath));
} catch (e) {
  console.error(String(e?.message ? e.message : e));
  process.exit(1);
}
