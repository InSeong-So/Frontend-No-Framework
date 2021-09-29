let currentObserver = null;

export const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = obj => {
  Object.keys(obj).forEach(_key => {
    let _value = obj[_key];
    let observer = new Set();

    Object.defineProperty(obj, _key, {
      get() {
        if (currentObserver) observer.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observer.forEach(fn => fn());
      },
    });
  });
  return obj;
};
