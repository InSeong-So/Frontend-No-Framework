class Mvvm {
  constructor(options) {
    const { $el, $data, $methods } = options;
    this.methods = $methods;
    this.target = null;
    this.observe(this, $data);
    this.compile(document.getElementById($el));
  }

  observe(root, data) {
    for (const key in data) {
      this.defineReactive(root, key, data[key]);
    }
  }

  defineReactive(root, key, value) {
    if (typeof value == 'object') {
      return this.observe(value, value);
    }
    const dep = new Dispatcher();
    Object.defineProperty(root, key, {
      set(newValue) {
        if (value == newValue) return;
        value = newValue;
        dep.notify(newValue);
      },
      get() {
        dep.add(this.target);
        return value;
      },
    });
  }

  compile(dom) {
    const nodes = dom.childNodes;
    for (const node of nodes) {
      console.log(node);
      if (node.nodeType == 1) {
        const attrs = node.attributes;
        for (const attr of attrs) {
          if (attr.name == 'v-model') {
            const name = attr.value;
            node.addEventListener('input', e => {
              this[name] = e.target.value;
            });
            this.target = new Watcher(node, 'input');
            this[name];
          }
          if (attr.name == '@click') {
            const name = attr.value;
            node.addEventListener('click', this.methods[name].bind(this));
          }
        }
      }
      if (node.nodeType == 3) {
        const reg = /\{\{(.*)\}\}/;
        const match = node.nodeValue.match(reg);
        if (match) {
          const name = match[1].trim();
          this.target = new Watcher(node, 'text');
          this[name];
          node.nodeValue = '';
        }
      }
    }
  }
}

class Dispatcher {
  constructor() {
    this.watchers = [];
  }
  add(watcher) {
    this.watchers.push(watcher);
  }
  notify(value) {
    this.watchers.forEach(watcher => watcher.update(value));
  }
}

class Watcher {
  constructor(node, type) {
    this.node = node;
    this.type = type;
  }
  update(value) {
    if (this.type == 'input') {
      this.node.value = value;
    }
    if (this.type == 'text') {
      this.node.nodeValue = value;
    }
  }
}
