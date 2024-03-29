# 바닐라 자바스크립트로 여러 기능 구현하기
> ✍️ 프레임워크, 라이브러리 없이 구현해봅시다!

<br>

<div align=center>
  <h3>
    <a href="https://inseong-so.github.io/No-Framework-VanillaJS/">👀 눈으로 확인하기</a>
  </h3>
</div>

<br>

## ✋ `[`**참고**`]` 프로젝트에 들어가기 앞서

<details><summary><strong>자세히보기</strong></summary>

<br>

### 덕 타이핑(Duck Typing)을 활용해야 합니다.
> "오리처럼 생겼고, 오리처럼 걷고, 오리처럼 소리를 낸다면 그건 오리다".

- 이해가 안 된다구요? 괜찮아요! 예를 보여드릴게요.
  ```js
  function duck(face, work, voice){
    // 오리처럼 생겼다.
    this.face = face;
    // 오리처럼 걷는다.
    this.work = work;
    // 오리처럼 소리를 냅니다.
    this.voise = voice;
  }

  const animal = [
    new duck('젊은 오리 얼굴', '힘찬 오리 걸음', '성난 오리 소리'),
    new duck('늙은 오리 얼굴', '힘 없는 오리 걸음', '힘 없는 오리 소리'),
    new duck('아기 오리 얼굴', '아장아장 오리 걸음', '앳된 오리 소리'),
    new duck('엄마 오리 얼굴', '사뿐한 오리 걸음', '달래는 오리 소리'),
  ]
  ```
  - 물론 지저분해 보일 수 있지만, 우리는 오리인지의 여부를 *특정 프로퍼티의 존재 여부만 체크*하면 되는 것입니다. 이처럼덕 타이핑은 **적은 코드로도 객체를 폭 넓게 다루며**, **컴포넌트를 효율적으로 이해하게 하는 좋은 수단**이에요.

<br>

### `클로저`를 이해합니다.
> 클로저는 매우 강력한 자바스크립트의 요소이며, 모든 함수는 클로저니까요.

<br>

### `this`를 어떻게 활용하느냐에 따라 설계 관점에 큰 영향을 미칩니다.

<br>

### 자바스크립트는 `싱글 스레드`입니다.
> 타 언어와는 완전히 다른 식으로 비동기 프로그래밍을 해야 하죠. 자바스크립트는 실행 함수를 큐에 넣고 꺼내어 사용하며 동작합니다.

이를 해결하기 위해 자바스크립트 엔진은 **이벤트 루프**에서 한 번에 하나씩 함수를 꺼내 실행합니다. 이를 효율적으로, 좀 더 아름답게 작성하는 것은 자바스크립트 개발자들의 영원한 숙제입니다.

<br>

### `규약`을 지켜 코딩할 것.
> 모든 언어, 생활에 포함되는 항목입니다. 

자바스크립트의 기상천외한 유연성은 최소의 코드로 최대의 일을 할 수 있습니다. 물론 그 코드에 누가 어떤 것을 어떻게 실행시킬 지는 알 수 없습니다. 유연성이 독이 될 수 있는 경우의 수를 줄이는 수단으로, **규약 레지스트리(contract registry)** 를 활용하여 **에스팩트 지향 프로그래밍(Aspect-Oriented Programming, 관점 지향 프로그래밍)** 을 해봅시다.

<br>

### `소프트웨어 공학 원칙`을 적용하세요.
> 편하고 빠르게, 그러나 빈틈 없는 코드를 작성할 수 있습니다. 가장 유명한 **SOLID** 원칙과 **DRY** 원칙을 소개합니다.

1. **S**, Single Responsiblity Principle, 단일 책임 원칙
  - 모든 클래스(함수)는 반드시 한 가지 변경 사유가 존재해야 합니다.
  - `이게 무슨 무리한 소리란 말이죠?!` 놀랄 것 없습니다. 우리가 작성하는 코드는 한 줄, 한 단어가 모두 그 의미를 내포하고 있는데? 걱정하지 말고 아래를 보죠.
    ```js
    function sum(a, b){
      return a + b
    }
    ```
  - sum 함수의 유일한 관심사는 입력 받은 인자를 더하는 것입니다. 이를 어떻게 이행할지는 철저히 외부 수단에 달려 있으니 외부 인자 a + b를 이행하기 위해 함수 자체를 변경할 필요는 없어요!

<br>

- **O**, Open-Closed Principle, 개방-패쇄 원칙
  - 모든 소프트웨어 개체는 확장 가능성은 열고, 수정 가능성은 닫아야 합니다.
  - 어떤 경우에도 실행하는 핵심 코드를 변경하지 말고, 어떻게든 재사용하고 확장하라는 뜻입니다. 쉽게 이해하기 위해 웹 프레임워크를 사용한다고 가정합시다. 개발자는 웹 프레임워크에서 개방된 몇몇 설정 방법을 제외하고는 핵심 기능을 변경할 수 없습니다!

<br>

- **L**, Liskov Substitution Principle, 리스코프 치환 원칙
  - 어떤 타입에서 파생된 타입의 객체가 있습니다면, 이 타입을 사용하는 코드는 변경되면 안 됩니다.
  - 인터페이스와 관련이 있는 원칙입니다. 예를 들어 부모 객체에서 자식 객체로 파생하더라도 그 기본 로직이 변경되어선 안 된다는 것이죠. 다시 말해, 작성 중인 함수가 기반 클래스로 하는 일과 서브 클래스로 하는 일이 다르면 이 원칙에 맞지 않는 것입니다.

<br>

- **I**, Interface Segregation Principle, 인터페이스 분리 원칙
  - 기능이 많은 인터페이스는 더 작게 응축시킨 조각으로 나누어야 합니다.
  - 인터페이스 사용부(consumer)는 아주 작은 인터페이스 하나만 바라보면 됩니다. 자바스크립트에는 인터페이스도, 클래스도 없는데? 아닙니다. 함수가 기대하는 인자를 명확히 하고, 그 기대치를 최소화 해야 합니다. 특정 타입의 인자를 바라는게 아닌 이 타입에 실제로 필요한 프로퍼티가 더 있을 것이라 기대하는 것입니다.

<br>

- **D**, Dependency Inversion Principle, 의존성 역전 원칙
  - 상위 수준 모듈은 하위 수준 모듈에 의존해서는 안 되며, 둘은 추상화에 의존해야 합니다.
  - 보통 **의존성 주입**이라는 연관된 개념으로 표현하며 인터페이스와 관련이 있습니다. 조금 복잡한 내용이니 인터페이스를 잘 이해하고 있어야 합니다. 클래스 A가 클래스 B의 서비스가 필요한 경우, A는 B를 생성하지 않는 대신 A 생성자의 파라미터 하나가 B를 서술하는 인터페이스 역할을 합니다. 그러면 A는 B가 아닌 자신의 인터페이스만 바라보며, A가 생성되면 구체화한 B를 넘겨받으므로 B 역시 인터페이스에 의존되는 것입니다.
  - 상술했던 리스코프 치환 원칙으로 인터페이스를 만족하는 B의 파생형 버전을 제공할 수 있는 이점이 있으며, B를 고쳐야 할 경우 하위 버전 호환성을 유지하기 위해 어떤 로직을 계속 지녀야 하는지 일목요연하게 나타낼 수 있습니다.

<br>

- **DRY 원칙**
  - 잘 말라 건조한 코드로, 모든 지식 조각이 반복하지 않고 딱 한 번만 나오는 형태입니다.
  - SOLID 원칙의 개방-폐쇄 원칙이 DRY 원칙의 필연적 산물입니다. 예를 들어 A, B를 함께 하는 모듈이 있습니다면 A의 기능이 필요할 때 B의 기능을 들어내지 않는 한 모듈을 재사용할 수 없으므로 A를 다시 코딩하는 사태가 일어나게 돼요. 이는 DRY 원칙과 맞지 않으며 A와 B를 하는 함수 2개를 모듈에 주입하여 하나의 책임으로 묶어두면 문제를 간단히 해결할 수 있습니다.
  - 즉, DRY한 코드는 그 과정에 의존성 주입과 단일 책임 문제가 개입되는 것입니다.

<br>
<hr>

### 바르게 유지되는 코드란 무엇인가?
> "와, 이건 새로 만드는게 정신 건강에 좋고... 미래를 위해서도 나을 것 같아요😭"

방대한 레거시 코드를 보면 한숨이 나오고, 욕지거리가 목에 맴돕니다. 아무리 완벽한 프로그램이라도 유지보수를 몇 년 거치면 괴물이 탄생합니다. 이를 해결하기 위해서 어떻게 해야 할까요?

<br>

### 단위 테스트를 실천하자
> 가장 호쾌한 해결책이 여기 있습니다! **단위 테스트(unit test)** 는 시간이 흐르고 어떤 변화가 닥쳐와도 완벽한 프로그램을 만들 수 있게 합니다.

단위란 특정 조건에서 어떻게 작동해야 할지 정의한 것입니다. 단위 테스트 본체에서 작성한 코드는 준비(arrange), 실행(act), 단언(assert)의 패턴을 따릅니다.
1. 테스트 준비 : 단위를 실행할 조건을 확실히 정하고, 의존성 및 함수 입력 데이터를 설정합니다.
2. 테스트 실행 : 준비 단계에서 미리 설정한 입력을 기능에 넘겨 실행합니다.
3. 테스트 단언 : 미리 정한 조건에 따라 예상대로 단위가 작동하는지 확인합니다.

<br>

### TDD(Test-Driven Development, 테스트 주도 개발)를 적용하라
> 애플리케이션 코드를 짜기 **전에**, 해당 코드가 통과해야 할 단위 테스트를 **먼저** 작성하는 개발 방법입니다.

전체 단위 테스트 꾸러미를 만들어가는 TDD 방식을 따르면, **단위 정의**와 **인터페이스 설계**에 도움이 많이 됩니다. TDD를 실천할 때, 애플리케이션에 변화가 생기면 다음 단계를 밟게 됩니다.

이 단계를 적색(실패)-녹색(성공)-리팩터링(중복 제거) 과정이라고 합니다.

1. 완벽히 변경하면 성공, 그 전까지는 **반드시 실패**하는 단위 테스트 작성
2. 테스트가 성공할 수 있을 만큼의 **최소한**의 코딩
3. 애플리케이션 코드를 리팩토링하며 **중복 제거**

<br>

### 테스트하기 쉬운 코드로 다듬자
> 가장 중요한 단계는 관심사를 적절히 분리하는 **단일 책임 원칙**을 적용하는 것입니다.

- 다음 함수를 확인해볼까요?
  ```js
  // validateAndRegisterUser, 변경 전

  let User = Users || {};
  Users.registration = () => {
    return {
      validateAndResisterUser: function validateAndDisplayUser(user){
        if (!user || user.name === "" || user.password === || user.password.length < 6){
          throw new Error('사용자 인증이 실패했습니다.');
        }

        // 사용자 정보 전송
        fetch("http://myapp.com/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }).then((response) => {
          // 메세지 출력
          document.getElementById('user-message').innerText(`가입을 환영해요, ${response.data.name}님!!`);
        });
      }
    }
  }
  ```

위 함수는 세 가지 일을 담당하며, 관심사를 요약하면 아래와 같습니다.
1. user 객체가 올바른지 검증합니다. → **사용자 검증**
2. 검증이 완료된 user 객체를 서버로 전송합니다. → **서버와 통신**
3. UI에 메세지를 출력합니다. → **UI 제어**

<br>

그럼 validateAndRegisterUser 함수를 테스트할 조건을 나열해봅시다.
1. user가 null이면 에러를 냅니다.
2. null인 user는 서버로 전송하지 않습니다.
3. user가 null이면 UI를 업데이트하지 않습니다.
4. user가 undefined이면 에러를 냅니다.
5. undefined인 user는 서버로 전송하지 않습니다.
6. user가 undefined이면 UI를 업데이트하지 않습니다.
7. user의 name 프로퍼티가 빈 상태면 에러를 냅니다.
8. name 프로퍼티가 빈 user는 서버로 전송하지 않습니다.
9. user의 name 프로퍼티가 비어 있으면 UI를 업데이트 하지 않습니다.

<br>

와, 이렇게나 많음에도 오류 조건은 끝이 아닙니다. UI가 제대로 업데이트 되는지, 유효성 검사가 올바른지도 테스트해야 합니다.

이 코드는 테스트할 수 있지만 조건이 매우 다양하게 조합되며, 모두를 보완하는 것은 불가능에 가깝습니다.

그렇다면 상술한 세 가지 관심사를 각각 추출하여 단일 책임을 부여하면 어떨까요?

```js
// validateAndRegisterUser, 변경 후

let User = Users || {};
Users.registration = () => {
  return {
    validateAndResisterUser: function validateAndDisplayUser(user){
      if (!userValidator.userIsValid(user)){
        throw new Error('사용자 인증이 실패했습니다.');
      }

      // 사용자 정보 전송
      userRegister.registerUser(user);
      // 메세지 출력
      userDisplay.showRegistrationThankYou(user);
    }
  }
}
```

새로 고친 registration 모듈은 개별 객체 인스턴스를 의존성 주입으로 제공합니다. 다른 관심사에 직접 영향을 미쳤던 코드 대신 주입된 객체를 사용하는 것입니다. 그렇다면 테스트 케이스?
1. user가 잘못 넘어오면 에러가 납니다.
2. 잘못된 user는 등록하지 않습니다.
3. 잘못된 user는 표시하지 않습니다.
4. 올바른 user를 인자로 userRegister.registerUser 함수를 실행합니다.
5. userRegister.registerUser에서 에러가 나면 userDisplay.showRegistrationThankYou 함수는 실행하지 않습니다.
6. user가 성공적으로 등록되면 user를 인자로 userDisplay.showRegistrationThankYou 함수를 실행합니다.

<br>

오, 전체 테스트가 6개로 줄었네요! 이렇게 별개의 객체로 관심사를 추출하여 단일 책임을 부여하면 독립적인 객체는 각자 완전한 테스트 꾸러미를 가지므로 코드의 작성, 테스트, 이해가 쉬워집니다.

TDD를 실천하면 첫째, 작은 코드는 대개 간단하고 실수할 가능성이 작아 디버깅 시간을 상당히 줄일 수 있습니다.

둘째, 테스트로 코드를 완전히 커버하니 리팩토링을 하더라도 무섭지 않습니다.

결국 코드를 DRY하게 유지하여 코드베이스에 오류 발생 여지를 줄이고 규모를 작게 가져갈 수 있는 것입니다.

<br>

여기까지 길고 지루했던 당부의 말이었습니다. 이제부터 진짜 **애플리케이션**을 작성해봅시다.

<br>
<hr>

### 참조
- 자바스크립트 : 자바스크립트 패턴과 디자인
- 이벤트 기반 마이크로서비스 구축
- 함수형 자바스크립트
- 이펙티브 타입스크립트

</details>

<hr>
<br>

해당 저장소는 바닐라 자바스크립트를 적극적으로 활용하기 위해 관리하며, 구현 대상은 각종 프론트엔드 라이브러리와 프레임워크입니다.

설치하는 npm 패키지는 오로지 **ESLint/Prettier**, **TypeScript**, **Test Library**입니다(간혹 `axios`를 사용할 순 있습니다).

<br>

## 🙋‍♂️ 바닐라 자바스크립트로 구현을 한다는 것은?
1️⃣ 프레임워크는 무엇이고, 라이브러리는 무엇인지 명확하게 알아야 합니다.

2️⃣ 제약사항과 기술적 부채를 어디서 접근하고 어떻게 해결해야 할까요? 

3️⃣ 개발 트렌드에 따른 구현 형태는 어떻게 될까요?

4️⃣ 이 모든 걸 구현했다면 **타입스크립트(TypeScript)** 로 만듭시다.

<br>

## 🏃 웹 프레임워크 구성을 따라가기
### 🐡 컴포넌트
**🎆 Virtual DOM**
- 개념 : 가상 DOM은 실제 DOM의 내부 메모리 표현으로, 수정된 UI를 메모리에 보관하여 실제 DOM과 동기화하기 위함입니다.

- 구현 : `document.createElement` API로는 많은 엘리먼트를 생성할 때 코드가 복잡해지고 가독성이 떨어지는 단점이 있습니다. 따라서 ES5의 `Template literal`을 사용하여 가상 DOM을 구현하려고 했습니다. 현재는 string을 분석하여 엘리먼트 객체를 만들며 차후 웹 컴포넌트와 결합해 효율적인 가상 DOM을 확장합니다.

- > 참조 : [Virtual DOM과 Internals](https://ko.reactjs.org/docs/faq-internals.html)

<br>

**🎆 Shadow DOM**
- 개념 : 웹 컴포넌트의 CSS와 변수의 범위를 지정하기 위해 설계된 브라우저 API입니다.

- 구현 : 웹 컴포넌트의 `this.attachShadow({ mode: 'closed' });`를 사용하여 구현합니다. 그러나 외부 CSS와 변수에 폐쇄적이게 되므로 외부 환경과 격리시키기 위한 컴포넌트를 제작할 때 사용합니다. 예로 타이머가 있겠네요.

- > 참조 : [shadow DOM 사용하기](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM)

<br>

**🎆 Web Component**
- 개념 : HTML이 기본으로 제공하는 엘리먼트는 브라우저와 운영체에제 따라 다르게 보이는 경우도 있고, 더 발전하는 웹 환경에 대응하기에 한계가 있습니다. 이런 한계를 JavaScript 컴포넌트로 보완하고 있습니다. 그러나 JavaScript 컴포넌트는 사용이 어려울 뿐만 아니라 크기가 커서 실행 속도가 느립니다. W3C(World Wide Web Consortium)에서는 이러한 문제를 개선하고자 웹 컴포넌트(Web Component)라는 명세(Specification)를 만들었습니다.

- 구현 : 브라우저의 `HTMLElement`를 상속받아 클래스 형태로 컴포넌트를 작성합니다. 자체적으로 observable한 `attributeChangedCallback`와 mount/unmoun와 비슷한 `connectedCallback` 및 `disconnectedCallback`, `adoptedCallback` 메서드 등을 지원하므로 효율적인 라이프 사이클 메서드를 구현할 수 있습니다.

- > 참조 : [React.Component](https://ko.reactjs.org/docs/react-component.html) | [웹 컴포넌트](https://d2.naver.com/helloworld/188655)

<br>

**🎆 Class Component**
- 개념 : class로 정의된 컴포넌트로 생명주기 메서드를 가집니다. 이 메서드를 오버라이딩하여 특정 시점에 코드를 실행할 수 있습니다.

- 구현 : 템플릿 패턴을 사용하여 렌더링, 이벤트 바인딩, 의존성 주입을 활용할 수 있습니다.

- > 참조 : [생명주기 도표](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<br>

**🎆 Functional Component**
- 개념 : 함수로 선언된 컴포넌트로 부수 효과(Side Effect)를 최소화하기 좋은 컴포넌트 구현 방법입니다.

- 구현 : View와 Event를 분리하여 작성해봅니다. 또한 바인딩된 이벤트의 내부 state가 클로저에 갖히므로 외부에서 변경되는 상태를 어떻게 주입할 지가 관건입니다.

- > 참조 : [Components와 Props](https://ko.reactjs.org/docs/components-and-props.html)

<br>

### 🐠 상태 관리
**🎆 Local Storage**

**🎆 Redux**

**🎆 Vuex**

<br>

### 🐟 이벤트
**🎆Event Handler Attribute**

**🎆Event Handler Property**

**🎆EventTarget.prototype.addEventListener**

**🎆Bubbling**

**🎆Capturing**

**🎆Delegation**

<br>

### 🐬 라우트
**🎆 Hash Fragment**

**🎆 History API**

<br>

### 🐳 HTTP 요청
**🎆 XMLHttpRequest**

**🎆 fetch API**

<br>

### 🐋 소프트웨어 패턴
**🎆 Gang Of Four(GOF)**

**🎆 mvc**

**🎆 mvvm**

**🎆 flux**

<br>

### 🦈 함수형 프로그래밍
**🎆 Closure, High-Order Function**

**🎆 Functional Array**

**🎆 Currying**

**🎆 Composition, Pipe-line**

**🎆 Functor**

**🎆 Monad**

**🎆 Generator**

<br>

### 🐊 기타
**🎆 Diff Algorithm**

**🎆 Promise**

**🎆 Micro Task**

**🎆 React Hooks**

**🎆 Immutability**

<br>

## 연관 저장소
☑️ [IT-Note](https://github.com/InSeong-So/IT-Note) : 개발에 필요한 기초/기술 전반에 대한 내용을 기록한 저장소
☑️ [Frontend-Vanilla](https://github.com/InSeong-So/Frontend-Vanilla) : 바닐라 자바스크립트로 만든 기능으로 작성한 템플릿 저장소
☑️ [Frontend-React](https://github.com/InSeong-So/Frontend-React) : React, TypeScript, Emotion, Storybook으로 작성한 템플릿 저장소

<br>
<hr>
