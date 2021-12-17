const items = ['javascript', 'react', 'vue'];

const getTemplate = items => {
  return `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;
};

const app = document.querySelector('.app');

const input = document.querySelector('[name="item-input"]');
document.querySelector('button').addEventListener('click', () => {
  const virtual = app.cloneNode(true);
  items.push(input.value);
  const template = getTemplate(items);
  virtual.innerHTML = template;
  dispatchChangedDOM(document.body, app, virtual);
});

const isChangedNode = (realNode, virtualNode) => {
  const realAttributes = realNode.attributes;
  const virtualAttributes = virtualNode.attributes;
  if (realAttributes.length !== virtualAttributes.length) return true;

  const isDifference = Array.from(realAttributes).find(attribute => {
    const { name } = attribute;
    const realAttribute = realNode.getAttribute(name);
    const virtualAttribute = virtualNode.getAttribute(name);

    return realAttribute !== virtualAttribute;
  });

  if (isDifference) return true;

  if (
    realNode.children.length === 0 &&
    virtualNode.children.length === 0 &&
    realNode.textContent !== virtualNode.textContent
  )
    return true;

  return false;
};

const dispatchChangedDOM = (target, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    target.appendChild(virtualNode);
    return;
  }

  if (isChangedNode(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    dispatchChangedDOM(realNode, realChildren[i], virtualChildren[i]);
  }
};

(function () {
  const virtual = app.cloneNode(true);
  const template = getTemplate(items);
  virtual.innerHTML = template;
  dispatchChangedDOM(document.body, app, virtual);
})();
