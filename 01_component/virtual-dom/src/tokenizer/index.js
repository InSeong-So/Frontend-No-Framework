import { STARTTAG_REX, ENDTAG_REX } from './regexp.js';
import { isEmptyMaker } from './makers.js';
import { TagStart, TagEmpty, TagEnd, Text } from './types.js';

export const tokenize = html => {
  let string = html;
  const tokens = [];
  const maxTime = Date.now() + 1000;

  while (string) {
    if (string.indexOf('<!--') === 0) {
      const lastIndex = string.indexOf('-->') + 3;
      string = string.substring(lastIndex);
      continue;
    }
    if (string.indexOf('</') === 0) {
      const match = string.match(ENDTAG_REX);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      if (isEmptyMaker(name)) continue;

      tokens.push(new TagEnd(name));
      continue;
    }
    if (string.indexOf('<') === 0) {
      const match = string.match(STARTTAG_REX);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      const attrs = match[2];
      const token = isEmptyMaker(name)
        ? new TagEmpty(name, attrs)
        : new TagStart(name, attrs);

      tokens.push(token);
      continue;
    }

    const index = string.indexOf('<');
    const text = index < 0 ? string : string.substring(0, index);

    string = index < 0 ? '' : string.substring(index);
    tokens.push(new Text(text));

    if (Date.now() >= maxTime) break;
  }
  return tokens;
};
