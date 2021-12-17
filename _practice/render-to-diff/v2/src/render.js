export default ($targetElement, template) => {
  const realDom = $targetElement;
  const virtualDom = realDom.cloneNode(true);
  virtualDom.innerHTML = template;

  const [realChilds, realLength] = getThisDomChilds(realDom);
  const [virtualChilds, virtualLength] = getThisDomChilds(virtualDom);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDom(realDom, realChilds[i], virtualChilds[i]);
  }
};

const getMaxLength = (target1 = 0, target2 = 1) => {
  return Math.max(target1, target2);
};

const getThisDomChilds = target => {
  const targetChildrens = Array.from(target.children);
  return [targetChildrens, targetChildrens.length];
};

const isChangedNode = (node1, node2) => {
  if (isNotEquals(node1.attributes, node2.attributes)) return true;
  if (isDifferenceAttrtibue(node1, node2)) return true;
  if (isNotEqualsLastContent(node1, node2)) return true;

  return false;
};

const isNotEquals = (target1, target2) => {
  return target1 !== target2;
};

const isNotEqualsLastContent = (node1, node2) => {
  if (node1.children.length !== 0) return false;
  if (node2.children.length !== 0) return false;
  if (node1.textContent !== node2.textContent) return true;
  return false;
};

const isDifferenceAttrtibue = (node1, node2) => {
  return Array.from(node1.attributes).find(attribute => {
    const { name } = attribute;
    const real = node1.getAttribute(name);
    const virtual = node2.getAttribute(name);
    return real !== virtual;
  });
};

const isOnlyExistReal = (node1, node2) => {
  return node1 && !node2;
};

const isOnlyExistVirtual = (node1, node2) => {
  return !node1 && node2;
};

const renderDom = ($targetElement, realNode, virtualNode) => {
  if (isOnlyExistReal(realNode, virtualNode)) {
    realNode.remove();
    return;
  }

  if (isOnlyExistVirtual(realNode, virtualNode)) {
    $targetElement.appendChild(virtualNode);
    return;
  }

  if (isChangedNode(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const [realChilds, realLength] = getThisDomChilds(realNode);
  const [virtualChilds, virtualLength] = getThisDomChilds(virtualNode);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDom(realNode, realChilds[i], virtualChilds[i]);
  }
};
