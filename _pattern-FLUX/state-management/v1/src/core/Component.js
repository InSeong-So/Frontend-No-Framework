import store from '../store/index.js';

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

const renderDom = (target, realNode, virtualNode) => {
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
    renderDom(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default class Component {
  constructor(element) {
    this.$store = store;
    this.$store.events.subscribe('stateChange', () => this.render());
    this.$element = element;
    this.init();
    this.render();
    this.registEvent();
  }

  // 최초 데이터 세팅
  init() {}

  // 화면에 그려질 DOM 정의
  view() {}

  // DOM 그리기
  render() {
    this.$element.innerHTML = this.view();
  }

  // Event 등록
  registEvent() {}
}
