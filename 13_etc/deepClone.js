const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_FLAT_FLAG = 1 << 1;
const CLONE_SYMBOLS_FLAG = 1 << 2;

function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

function isArray(value) {
  return Array.isArray(value);
}

function isSet(value) {
  return _baseGetTag(value) === '[object Set]';
}

function isMap(value) {
  return _baseGetTag(value) === '[object Map]';
}

function _baseGetTag(value) {
  return Object.prototype.toString.call(value);
}

function keys(object) {
  return Object.keys(object);
}

function _getAllKeys(object) {
  return [...keys(object), ...Object.getOwnPropertySymbols(object)];
}

function _getAllKeysIn(object) {
  let patrol = object;
  const result = [];
  while (patrol !== null) {
    result.push(..._getAllKeys(patrol));
    patrol = Object.getPrototypeOf(patrol);
  }
  return result;
}

function keysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  return result;
}

function _baseClone(value, bitmask, customizer, key, object, stack = new Map()) {
  let result;
  const isDeep = bitmask & CLONE_DEEP_FLAG;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object
      ? customizer(value, key, object, stack)
      : customizer(value, undefined, undefined, stack);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  if (isArray(value)) {
    if (!isDeep) {
      return [...value];
    }
    result = new Array(value.length);
  } else {
    const tag = _baseGetTag(value);
    switch (tag) {
      case '[object Object]':
        result = Object.create(Object.getPrototypeOf(value));
        break;
      case '[object Set]':
        result = new Set();
        break;
      case '[object Map]':
        result = new Map();
        break;
      case '[object RegExp]':
        result = new RegExp(value.source, value.flags);
        result.lastIndex = value.lastIndex;
        break;
      case '[object Date]':
        result = new Date(value.valueOf());
        break;
      case '[object String]':
        result = new String(value.valueOf());
        break;
      case '[object Boolean]':
        result = new Boolean(value.valueOf());
        break;
      case '[object Number]':
        result = new Number(value.valueOf());
        break;
      case '[object Symbol]':
        result = Object(Symbol.prototype.valueOf.call(value));
        break;
      case '[object Function]':
      case '[object AsyncFunction]':
      case '[object GeneratorFunction]':
        result = object ? value : {};
        break;
      default:
        result = {};
        break;
    }
  }
  if (stack.has(value)) {
    return stack.get(value);
  }
  stack.set(value, result);
  if (isArray(value)) {
    value.forEach((subValue, index) => {
      result[index] = _baseClone(subValue, bitmask, customizer, index, value, stack);
    });
  }
  if (isSet(value)) {
    value.forEach(subValue => {
      result.add(_baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  }
  if (isMap(value)) {
    value.forEach((subValue, key) => {
      result.set(key, _baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }
  const keysFunc = isFlat ? (isFull ? _getAllKeysIn : keysIn) : isFull ? _getAllKeys : keys;
  keysFunc(value).forEach(key => {
    Object.assign(result, {
      [key]: _baseClone(value[key], bitmask, customizer, key, value, stack),
    });
  });
  stack.delete(value);
  return result;
}

export default function cloneDeep(vale) {
  return _baseClone(vale, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
