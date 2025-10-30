#!/usr/bin/env node

const locateYandex =
  require('./dist/index.cjs').default || require('./dist/index.cjs');

const argv = process.argv.slice(2);
const allowFallback = argv.includes('--fallback') || argv.includes('-f');

console.log(locateYandex(allowFallback));
