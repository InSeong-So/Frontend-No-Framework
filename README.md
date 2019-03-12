# 목차

# 자바스크립트의 핵심 개념
## 객체
- 기본 데이터 타입
  - Boolean
  - Number
  - String

<br>

- 특별 값
  - null
  - undefined

## 함수
- 자바스크립트에서는 함수도 객체로 취급한다.
  - 일반적인 객체보다 조금 더 많은 기능이 있는 객체이다.

<br>

- 자바스크립트에서 중요한 개념으로, 함수가 일급 객체(First Class Obejct)로 다뤄지기 때문이다.

## 프로토타입
- 모든 객체는 숨겨진 링크(Link)인 프로토타입(Prototype)을 가진다.
  - 링크는 해당 객체를 생성한 생성자의 프로토타입 객체를 가리킨다.
  - 링크는 ECMAScript에서 `[[Protorype]]`이라고 표현한다.

<br>

- 링크를 동해 자바스크립트는 훨씬 더 다양한 자료 구조를 작성할 수 있다.

## 실행 컨텍스트와 클로저
- 자바스크립트는 자신만의 독특한 과정으로 실행 컨텍스트를 만들고, 그 안에서 실행이 이루어진다.
  - 실행 컨텍스트는 자신만의 유효 범위(Scope)를 가지며 이 과정에서 클로저를 구현할 수 있다.

<br>

# 자바스크립트와 객체지향 프로그래밍
- 자바스크립트는 클래스를 지원하지 않으나 객체지향 프로그래밍이 가능하다.
- 프로토타입 체인과 클로저로 객체지향 프로그래밍에서 제시하는 상속, 캡슐화, 정보 은닉 등의 개념을 소화할 수 있다.

# 자바스크립트와 함수형 프로그래밍
- 자바슼크립트는 함수적 프로그래밍이 가능하다.
  - 함수형 프로그래밍은 높은 수준의 모듈화가 가능하다.

<br>

- 일급 객체로서의 함수 특성과 클로저를 활용하여 구현한다.
  - 가독성을 떨어뜨리는 요인이 되기도 한다.
  - 함수형 프로그래밍 기법으로 구현된 코드는 제 3자가 해석하기에는 많이 난해하다.

# 자바스크립트의 단점
- 유연하고 뛰어난 표현력으로 인한 디버깅의 어려움
- 느슨한 타입체크로 인한 컴파일-런타임 오류가 발생
- 전역 객체 안에 최상위 레벨의 객체 존재로 인한 이름 충돌의 위험성