import { DRAFT_STATE, DRAFTABLE } from './constants/index.js';

/** Each scope represents a `produce` call. */
class ImmerScope {
  constructor(parent) {
    this.drafts = [];
    this.parent = parent;

    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    this.canAutoFreeze = true;

    // To avoid prototype lookups:
    this.patches = null;
  }
  usePatches(patchListener) {
    if (patchListener) {
      this.patches = [];
      this.inversePatches = [];
      this.patchListener = patchListener;
    }
  }
  revoke() {
    this.leave();
    this.drafts.forEach(revoke);
    this.drafts = null; // Make draft-related methods throw.
  }
  leave() {
    if (this === ImmerScope.current) {
      ImmerScope.current = this.parent;
    }
  }
}

ImmerScope.current = null;
ImmerScope.enter = function () {
  return (this.current = new ImmerScope(this.current));
};

function revoke(draft) {
  draft[DRAFT_STATE].revoke();
}

const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.',
        },
      ],
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고',
        },
      ],
    },
  ],
  selectedId: 1,
};

const isMap = target => {
  return target instanceof Map;
};

const has = (thing, prop) => {
  return Object.prototype.hasOwnProperty.call(thing, prop);
};

const assignMap = (target, overrides) => {
  overrides.forEach(function (override) {
    for (let key in override) {
      if (has(override, key)) {
        target.set(key, override[key]);
      }
    }
  });
  return target;
};

const assignObjectLegacy = (target, overrides) => {
  overrides.forEach(override => {
    for (let key in override) {
      if (has(override, key)) {
        target[key] = override[key];
      }
    }
  });
  return target;
};

const assign = (target, ...overrides) => {
  if (isMap(target)) {
    return assignMap(target, overrides);
  }
  if (Object.assign) {
    return Object.assign(target, ...overrides);
  }
  return assignObjectLegacy(target, overrides);
};

const ownKeys =
  typeof Reflect !== 'undefined' && Reflect.ownKeys
    ? Reflect.ownKeys
    : typeof Object.getOwnPropertySymbols !== 'undefined'
    ? obj =>
        Object.getOwnPropertyNames(obj).concat(
          Object.getOwnPropertySymbols(obj),
        )
    : Object.getOwnPropertyNames;

const shallowCopy = (base, invokeGetters = false) => {
  if (Array.isArray(base)) return base.slice();
  if (isMap(base)) return new Map(base);
  const clone = Object.create(Object.getPrototypeOf(base));
  ownKeys(base).forEach(key => {
    if (key === DRAFT_STATE) {
      return; // Never copy over draft state.
    }
    const desc = Object.getOwnPropertyDescriptor(base, key);
    let { value } = desc;
    if (desc.get) {
      if (!invokeGetters) {
        throw new Error('Immer drafts cannot have computed properties');
      }
      value = desc.get.call(base);
    }
    if (desc.enumerable) {
      clone[key] = value;
    } else {
      Object.defineProperty(clone, key, {
        value,
        writable: true,
        configurable: true,
      });
    }
  });
  return clone;
};

const markChanged = state => {
  if (!state.modified) {
    state.modified = true;
    state.copy = assign(shallowCopy(state.base), state.drafts);
    state.drafts = null;
    if (state.parent) markChanged(state.parent);
  }
};

// 변경할 때까지 현재 값(기본)을 읽어야 하는 개체를 반환합니다.
const source = state => {
  return state.copy || state.base;
};

const isDraftable = value => {
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return true;
  const proto = Object.getPrototypeOf(value);
  if (!proto || proto === Object.prototype) return true;
  if (isMap(value)) return true;
  return !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
};

const peek = (draft, prop) => {
  const state = draft[DRAFT_STATE];
  const desc = Reflect.getOwnPropertyDescriptor(
    state ? source(state) : draft,
    prop,
  );
  return desc && desc.value;
};

const is = (x, y) => {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
};

const proxyHandlers = {
  get: (state, prop) => {
    if (prop === DRAFT_STATE) return state;
    let { drafts } = state;

    // Check for existing draft in unmodified state.
    if (!state.modified && has(drafts, prop)) {
      return drafts[prop];
    }

    const value = source(state)[prop];
    if (state.finalized || !isDraftable(value)) {
      return value;
    }

    // Check for existing draft in modified state.
    if (state.modified) {
      // Assigned values are never drafted. This catches any drafts we created, too.
      if (value !== peek(state.base, prop)) return value;
      // Store drafts on the copy (when one exists).
      drafts = state.copy;
    }

    return (drafts[prop] = createProxy(value, state));
  },
  set: (state, prop, value) => {
    if (!state.modified) {
      const baseValue = peek(state.base, prop);
      // Optimize based on value's truthiness. Truthy values are guaranteed to
      // never be undefined, so we can avoid the `in` operator. Lastly, truthy
      // values may be drafts, but falsy values are never drafts.
      const isUnchanged = value
        ? is(baseValue, value) || value === state.drafts[prop]
        : is(baseValue, value) && prop in state.base;
      if (isUnchanged) return true;
      markChanged(state);
    }
    state.assigned[prop] = true;
    state.copy[prop] = value;
    return true;
  },
  deleteProperty: (state, prop) => {
    // The `undefined` check is a fast path for pre-existing keys.
    if (peek(state.base, prop) !== undefined || prop in state.base) {
      state.assigned[prop] = false;
      markChanged(state);
    }
    if (state.copy) delete state.copy[prop];
    return true;
  },
  enumerate: (state, prop) => {
    return state.keys();
  },
  ownKeys: (state, prop) => {
    return Reflect.ownKeys(source(state));
  },
  has: (state, prop) => {
    return prop in source(state);
  },
  defineProperty() {
    throw new Error("Object.defineProperty() cannot be used on an Immer draft") // prettier-ignore
  },
  getPrototypeOf(target) {
    return Object.getPrototypeOf(target.base);
  },
  setPrototypeOf() {
    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft") // prettier-ignore
  },
  getOwnPropertyDescriptor: (state, prop) => {
    const owner = source(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (desc) {
      desc.writable = true;
      desc.configurable = !Array.isArray(owner) || prop !== 'length';
    }
    return desc;
  },
};

const createProxy = (base, parent) => {
  const scope = parent ? parent.scope : ImmerScope.current;
  const state = {
    // Track which produce call this is associated with.
    scope,
    // True for both shallow and deep changes.
    modified: false,
    // Used during finalization.
    finalized: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned: {},
    // The parent draft state.
    parent,
    // The base state.
    base,
    // The base proxy.
    draft: null,
    // Any property proxies.
    drafts: {},
    // The base copy with any updated values.
    copy: null,
    // Called by the `produce` function.
    revoke: null,
  };
  const { revoke, proxy } = Proxy.revocable(base, proxyHandlers);
  state.draft = proxy;
  state.revoke = revoke;
  scope.drafts.push(proxy);
  return proxy;
};

const compose = (base, recipe) => {
  const scope = ImmerScope.enter();
  const proxy = createProxy(base);
  scope.leave();
  const result = recipe(proxy);
  return result;
};

/*
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!',
  });
});
*/

const reducer = compose(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!',
  });
});

console.log(reducer);
