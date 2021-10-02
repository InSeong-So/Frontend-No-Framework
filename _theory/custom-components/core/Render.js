export const dispatchChangedDOM = (parent, real, virtual) => {
  if (real && !virtual) {
    real.remove();
    return;
  }

  if (!real && virtual) {
    parent.appendChild(virtual);
    return;
  }

  if (isChangedNode(real, virtual)) {
    real.replaceWith(virtual);
    return;
  }

  const realChildren = Array.from(real.children);
  const virtualChildren = Array.from(virtual.children);
  const max = Math.max(realChildren, virtualChildren);

  for (let i = 0; i < max; i++) {
    dispatchChangedDOM(real, realChildren[i], virtualChildren[i]);
  }
};

const isChangedNode = (real, virtual) => {
  const realAttributes = real.attributes;
  const virtualAttributes = real.attributes;

  if (realAttributes.length !== virtualAttributes.length) return true;

  const isDifference = Array.from(realAttributes).find(attribute => {
    const { name } = attribute;
    return real.getAttribute(name) !== virtual.getAttribute(name);
  });

  if (isDifference) return true;

  if (
    real.children.length === 0 &&
    virtual.children.length === 0 &&
    real.textContent !== virtual.textContent
  )
    return true;

  return false;
};
