> 첫 번째 커밋때 추가한 부분

1. 상태를 관리해보자. 중앙 집중식 저장소로 컴포넌트와의 관계를 맺고 제어해보자. Vue, React 같은 프레임워크의 목적 중 하나는 **상태를 기반으로 DOM을 렌더링하는 것**이기 때문이다.

<br>

2. 관찰자 패턴(Observer Pattern)에 대해 이해하자. 우선 관계를 살펴볼까?
  - 중앙 집중식 저장소를 `Store`라고 한다면 이를 구현하기 위해서는 저장소(Store)와 컴포넌트(Component)의 관계를 아래와 같이 명확히 한다.
  - Store는 여러 컴포넌트에서 사용할 수 있다.
  - Store가 변경될 때, Store가 사용되고 있는 Component도 변경되어야 한다.

<br>

3. 2번을 의사코드로 표현하자면 아래와 같다.
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

4. 3번과 같이 작성되는 패턴을 관찰자 패턴(Observer Pattern)이라고 한다.
   - 객체의 상태 변화를 관찰하는 관찰자들, 옵저버들의 목록을 객체에 등록하여 **상태 변화가 있을 때마다 메서드 등을 통해 겍체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴**이다.
   - 주로 **분산 이벤트 핸들링 시스템**을 구현하는데 사용된다.
   - **발행/구독 모델(Publish/Subscribe Model)** 로도 알려져 있다.

<br>

5. 발행기관을 작성한다.
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

6. 발행기관을 구독할 구독자를 작성한다.
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

7. 확인해보자.
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

