> 첫 번째 커밋때 추가한 부분

### 1. 상태를 관리해보자.
- 중앙 집중식 저장소로 컴포넌트와의 관계를 맺고 제어해보자.
- Vue, React 같은 프레임워크의 목적 중 하나는 **상태를 기반으로 DOM을 렌더링하는 것**이기 때문이다.

<br>

### 2. 관찰자 패턴(Observer Pattern)에 대해 이해하자. 우선 관계를 살펴볼까?
> 중앙 집중식 저장소를 `Store`라고 한다면 이를 구현하기 위해서는 저장소(Store)와 컴포넌트(Component)의 관계를 아래와 같이 명확히 한다.
- Store는 여러 컴포넌트에서 사용할 수 있다.
- Store가 변경될 때, Store가 사용되고 있는 Component도 변경되어야 한다.

<br>

### 3. 2번을 의사코드로 표현하자면 아래와 같다.
```js
// Store 생성
const store = new Store({a: 10, b: 20});

// Component 생성
const componentA = new Component(() => console.log(a + b););
const componentB = new Component(() => console.log(a * b););

// Component가 Store를 구독한다.
component1.subscribe(store);
component2.subscribe(store);

// store의 state를 변경한다.
store.setState({a: 100, b: 200});

// store가 변경되었음을 알린다.
store.notify();
```
  - 순서대로 따라가보자. 처음 componentA는 a + b = 30을 출력하고, componentB는 a * b = 200을 출력한다.
  - store의 값이 변경되면 a + b = 300, a * b = 20000을 각각 출력한다.

<br>

### 4. 3번과 같이 작성되는 패턴을 관찰자 패턴(Observer Pattern)이라고 한다.
> 객체의 상태 변화를 관찰하는 관찰자들, 옵저버들의 목록을 객체에 등록하여 **상태 변화가 있을 때마다 메서드 등을 통해 겍체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴**이다.
- 주로 **분산 이벤트 핸들링 시스템**을 구현하는데 사용된다.
- **발행/구독 모델(Publish/Subscribe Model)** 로도 알려져 있다.

<br>

### 5. 발행기관을 작성한다.
```js
class Publish {
  constructor(state) {
    this._state = state;
    this._observers = new Set();
    Object.keys(state).forEach(key =>
      Object.defineProperty(this, key, {
        get: () => this._state[key],
      }),
    );
  }

  setState(newState) {
    this._state = { ...this._state, ...newState };
    this.notification();
  }

  subscribe(newUser) {
    this._observers.add(newUser);
  }

  notification() {
    this._observers.forEach(fn => fn());
  }
}
```
- 핵심 내용은 **내부에 변화가 생길 경우 구독자에게 알리는 것**. 이 메서드다.
  ```js
  setState(newState) {
    this._state = { ...this._state, ...newState };
    this.notification();
  }
  ```

<br>

### 6. 발행기관을 구독할 구독자를 작성한다.
```js
class Subscriber {
  constructor(work) {
    this._fn = work;
  }

  subscribe(publisher) {
    publisher.subscribe(this._fn);
  }
}
```
- 구독자는 **발행기관에서 변화가 생겼을 때 하는 일을 정의**하고, 발행기관을 **구독**한다.

<br>

### 7. 확인해보자.
```js
(function () {
  const state = new Publish({
    a: 10,
    b: 20,
  });

  const 덧셈계산기 = new Subscriber(() =>
    console.log(`a + b = ${state.a + state.b}`),
  );
  const 곱셈계산기 = new Subscriber(() =>
    console.log(`a * b = ${state.a * state.b}`),
  );

  덧셈계산기.subscribe(state);
  곱셈계산기.subscribe(state);

  state.notification();
  // a + b = 30
  // a * b = 200

  state.setState({ a: 100, b: 200 });
})();
```
- 결과

<br>

<div align='center'>

<img src='./images/1.jpg' width='600'/>

</div>

<br>

- 지금은 `2명의 구독자가 1개의 발행기관을 구독하고 있는 상황`인데, 만약 **10명의 구독자가 100개의 발행기관을 구독**한다면 관련 코드가 기하급수적으로 늘어나는 문제가 있다.
    
<br>

> 두 번째 커밋때 추가한 부분

### 8. 위의 코드들을 observable과 observe라는 관계로 만들 것이다.
```js
const state = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${state.a}`));
observe(() => console.log(`b = ${state.b}`));
observe(() => console.log(`a + b = ${state.a} + ${state.b}`));
observe(() => console.log(`a * b = ${state.a} + ${state.b}`));
observe(() => console.log(`a - b = ${state.a} + ${state.b}`));

state.a = 100;
state.b = 200;
```
- observable은 observe에서 사용된다.
- observable에 변화가 생기면, observe에 등록된 함수가 실행된다.
- 논리는 명확하다. 그럼 어떻게 구현해야 할까?

<br>

### 9. [Object.defineProperty](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)이라는 API가 존재한다.
- MDN 문서에 설명되어 있는 말은 `Object.defineProperty() 정적 메서드는 객체에 새로운 속성을 직접 정의하거나 이미 존재하는 속성을 수정한 후, 해당 객체를 반환합니다.` 이다.
- 그렇다면? 특정 객체를 수정할 때마다 반환 값이 존재하니 React의 setState처럼 사용할 수 있지 않을까?

  ```js
  let a = 10;
  const state = {};
  Object.defineProperty(state, 'a', {
    get () {
      console.log(`현재 a의 값은 ${a} 입니다.`);
      return a;
    },
    set (value){
      a = value;
      console.log(`변경된 a의 값은 ${a} 입니다.`);
    }
  });

  console.log(`state.a = ${state.a}`);
  state.a = 100;
  ```

- 결과

  <br>

  <div align='center'>

  <img src='./images/2.jpg' width='600'/>

  </div>

  <br>

<br>

### 10. 아주 명확하다! 해당 함수에 대해 자세히 언급하자면 이렇다.
- 정의 : `Object.defineProperty(object, prop, descriptor)`
  - **object** : 속성을 정의할 객체
  - **prop** : 새로 정의하거나 수정하려는 속성의 이름 또는 Symbol
  - **descriptor** : 새로 정의하거나 수정하려는 속성을 기술하는 객체
- 즉, 객체에 변화가 생기거나 무언가 참조할 경우 우리가 원하는 특정 행위를 중간에 기술할 수 있다.
- 복수의 프로퍼티를 동시에 선언하고 싶다면 `Object.defineProperties(object, props)`를 사용하자.

<br>

### 11.  그럼 여러 속성을 관리하려면 어떻게 확장해야 할까?
> 고정된 프로퍼티라면 `Object.defineProperties`를 사용해 선언할 수 있지만, 동적으로 관리되는 경우가 많으니 반복문을 활용한다.
  ```js
  const state = {
    a: 10,
    b: 20,
  };

  const stateKeys = Object.keys(state);

  for (const key of stateKeys) {
    let _value = state[key];
    Object.defineProperty(state, key, {
      get () {
        console.log(`현재 state.${key}의 값은 ${_value} 입니다.`);
        return _value;
      },
      set (value) {
        _value = value;
        console.log(`변경된 state.${key}의 값은 ${_value} 입니다.`);
      }
    })
  }

  console.log(`a + b = ${state.a + state.b}`);

  state.a = 100;
  state.b = 200;
  ```

<br>

### 12. 형태가 보이기 시작한다.
> console.log 부분을 observer 함수로 대체하자.

```js
const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);
const observer = () => console.log(`a + b = ${state.a + state.b}`);

for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get () {
      return _value;
    },
    set (value) {
      _value = value;
      observer();
    }
  })
}

observer();

state.a = 100;
state.b = 200;
```

<br>

### 13. 함수가 대체되는 것을 확인했다.
> 그럼 이제 확장해보자.

```js
const state = { a: 10, b: 20 };
const stateKeys = Object.keys(state);
let currentObserver = null;
for (const _key of stateKeys) {
  let _value = state[_key];
  const observers = new Set();
  Object.defineProperty(state, _key, {
    get() {
      if (currentObserver) observers.add(currentObserver);
      console.log(observers);
      return _value;
    },
    set(value) {
      _value = value;
      observers.forEach(observer => observer());
    },
  });
}

const plusCalculator = () => {
  currentObserver = plusCalculator;
  console.log(`state a + b : ${state.a + state.b}`);
};

const subtractCalculator = () => {
  currentObserver = subtractCalculator;
  console.log(`state a - b : ${state.a - state.b}`);
};

plusCalculator();
subtractCalculator();

state.a = 1000;
state.b = 50000;
```
- 이 코드의 핵심은 함수가 실행될 때 currentObsever가 실행중인 함수를 참조하도록 만든 것이다.
  - state의 property가 사용될 때(get 메서드가 실행될 때) currentObserver를 observers에 등록한다.
  - state의 property가 변경될 때(set 메서드가 실행될 때) observers에 등록된 모든 observer를 실행한다.

<br>

### 14. 위 코드를 재사용해야 하니 함수로 만들어보자. 
```js
let currentObserver = null;

const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = obj => {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    let _value = obj[key];
    let observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach(fn => fn());
      },
    });
  });

  return obj;
};

const state = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${state.a}`));
observe(() => console.log(`b = ${state.b}`));
observe(() => console.log(`a + b = ${state.a} + ${state.b}`));
observe(() => console.log(`a * b = ${state.a} + ${state.b}`));
observe(() => console.log(`a - b = ${state.a} + ${state.b}`));

state.a = 100;
state.b = 200;
```

<br>