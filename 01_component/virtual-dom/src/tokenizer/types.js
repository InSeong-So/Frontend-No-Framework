import { ATTR_REX } from './regexp.js';
import { isFillattrsMaker } from './makers.js';

export class TagStart {
  constructor(name, tag) {
    this.name = name;
    this.attributes = this.getAttributes(tag);
  }

  getAttributes(str) {
    const attrsMap = {};
    str.replace(ATTR_REX, (match, name, ...rest) => {
      const args = Array.prototype.slice.call(rest);
      const value = args[0]
        ? args[0]
        : args[1]
        ? args[1]
        : args[2]
        ? args[2]
        : isFillattrsMaker(name)
        ? name
        : '';

      attrsMap[name] = value.replace(/(^|[^\\])"/g, '$1\\"');
    });
    return attrsMap;
  }
}

export class TagEmpty extends TagStart {
  constructor(name, tag) {
    super(name, tag);
  }
}

export class TagEnd {
  name;
  constructor(name) {
    this.name = name;
  }
}

export class Text {
  text;
  constructor(text) {
    this.text = text;
  }
}
