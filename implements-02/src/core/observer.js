let currentObserver = null;

const debouneFrame = callback => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const observe = fn => {
  currentObserver = debouneFrame(fn);
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
        // 원시값
        if (_value === value) return;
        // 객체
        if (JSON.stringify(_value) === JSON.stringify(value)) return;
        // ECMA set
        // ECMA map
        _value = value;
        observer.forEach(fn => fn());
      },
    });
  });
  return obj;
};
