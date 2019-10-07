import flatten from 'flat';

import { default as sk_SK } from './sk-SK';

export default {
  'sk-SK': flatten<object, Record<string, string>>(sk_SK),
}