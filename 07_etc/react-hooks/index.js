// 예제 2
const MyReact = (function () {
  let _val; // 모듈 스코프 안에 state를 잡아놓습니다.
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue; // 매 실행마다 새로 할당됩니다.
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();

// 예제 2로 부터 이어짐
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render:', { count }),
  };
}
let App;
App = MyReact.render(Counter); // render: { count: 0 }
App.click();
App = MyReact.render(Counter); // render: { count: 1 }
