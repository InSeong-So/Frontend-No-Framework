# 함수와 프로토타입 체이닝
- 함수의 개념
  - 함수 생성
  - 함수 객체
  - 다양한 함수 형태
  - 함수 호출과 this
  - 프로토타입과 프로토타입 체이닝

<hr>
<br>

## 함수 정의
- 함수 생성 방법
  - 함수 선언문(function statement)
  - 함수 표현식(function expression)
  - Function() 생성사 함수

### 함수 리터럴
- 자바스크립트에서는 함수도 일반 객체처럼 값으로 취급한다.
  - 그러므로 함수 리터럴을 이용해 함수를 생성할 수 있다.

<br>

### 함수 선언문 방식으로 함수 생성하기
- 함수 리터럴 선언 방식은 함수 선언문 방식의 형태와 같다.
- 함수 선언문 방식으로 정의된 함수는 반드시 함수명이 정의되어 있어야 한다.
- 특징
  - function 이라는 키워드를 명시적으로 사용한다.
  - 리턴값과 매개변수로 넘기는 값에 변수 타입을 기술하지 않는다.
    ```js
    function add(x, y) {
        return x + y;
    }
    
    console.log(add(3,4));  // (출력값) 7
    ```

<br>

### 함수 표현식 방식으로 함수 생성하기
- 자바스크립트에서는 함수도 하나의 값으로 취급되므로 `일급 객체`라고 한다.
- 함수도 숫자나 문자열처럼 변수에 할당하는 것이 가능하다.
  - 함수 리터럴로 하나의 함수를 만들고 여기서 생성된 함수를 변수에 할당하여 함수를 생성하는 것을 함수 표현식이라고 한다.
    ```js
    // add() 함수 표현식
    var add = function (x, y) {
        return x + y;
    };

    var plus = add;

    console.log(add(3,4));  // 7
    console.log(plus(5,6)); // 11
    ```
    - add와 같이 함수가 할당된 변수를 함수 변수라고 한다.
    - 위의 예제가 익명 함수를 이용한 함수 표현식 방법(익명 함수 표현식)이다.
      - 익명 함수의 호출은 함수 호출 연산자 ( )를 붙여서 할 수 있다.
      - 함수 이름이 포함된 함수 표현식은 기명 함수 표현식이라고 한다.

- 기명 함수 표현식의 함수 호출 방법
    ```js
    var add = function sum(x, y) {
    return x + y;
    };

    console.log(add(3,4)); // 7
    console.log(sum(3,4)); // Uncaught ReferenceError: sum is not defined 에러 발생
    ```
    - 함수 표현식에서 사용된 함수 이름은 외부 코드에서 접근이 불가능하므로 에러가 발생한다.
    - 함수 이름은 정의된 함수 내부에서 해당 함수를 재귀적으로 호출하거나 디버거 등에서 함수를 구분할 때 사용한다.

- 함수 표현식 방식으로 구현한 팩토리얼 함수
    ```js
    var factorialVar = function factorial(n) {
        if(n <= 1) {
            return 1;
        }
        return n * factorial(n-1);
    };

    console.log(factorialVar(3));  // 6
    console.log(factorial(3)); // Uncaught ReferenceError: factorial is not defined 에러 발생
    ```

<br>

### Function() 생성자 함수를 통한 함수 생성하기
- 자바스크립트의 함수도 Function() 이라는 기본 내장 생성자 함수로부터 생성된 객체라고 볼 수 있다.
  - 문법 : `new Function (arg1, arg2, ..., argN, functionBody)`
    ```js
    var add = new Function('x', 'y', 'return x + y');
    console.log(add(3, 4)); // 7
    ```
    - arg1, arg2, ..., argN : 함수의 매개변수
    - functionBody : 함수가 호출될 때 실행될 코드를 포함한 문자열

<br>

### 함수 호이스팅
- 함수를 생성하는 3가지 방법에는 동작 방식이 약간씩 다르다.
  - 이 중 하나가 **함수 호이스팅(Function Hoisting)** 이다.
    ```js
    console.log(add(2,3)); // 5

    // 함수 선언문 형태로 add() 함수 정의
    function add(x, y) {
        return x + y;
    }

    console.log(add(3, 4)); // 7
    ```
    - 함수 선언문 형태로 정의한 함수의 유효 범위는 코드의 맨 처음부터 시작하며 이것을 함수 호이스팅이라고 한다.

    <br>

  - 함수 호이스팅은 함수를 사용하기 전에 반드시 선언해야 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들 수도 있으므로 함수 표현식 사용을 권장한다.
    ```js
    add(2,3); // uncaught type error

    // 함수 표현식 형태로 add() 함수 정의
    var add = function (x, y) {
        return x + y;
    };

    add(3, 4);
    ```
    - 함수 표현식 형태로 정의된 함수는 호이스팅이 일어나지 않는다.

- 함수 호이스팅의 원인 자바스크립트의 변수 생성(Instantiation)과 초기화(Initialization)의 작업이 분리되어 진행되기 때문이다.

<hr>
<br>

## 함수 객체 : 함수도 객체다
### 자바스크립트에서는 함수도 객체다
- 자바스크립트에서는 함수도 객체이므로 프로퍼티들을 가질 수 있다.
    ```js
    // 함수 선언 방식으로 add()함수 정의
    function add(x, y) {
    return x+y;
    }

    // add() 함수 객체에 result, status 프로퍼티 추가
    add.result = add(3, 2);
    add.status = 'OK';

    console.log(add.result); // 5
    console.log(add.status); // 'OK'
    ```
    - 함수 코드는 함수 객체의 [[Code]] 내부 프로퍼티에 저장된다.
    - 함수 객체의 프로퍼티를 동적으로 생성하고 접근할 수 있다.

<br>

### 자바스크립트에서의 함수는 값으로 취급된다
- 함수도 일반 객체처럼 취급될 수 있으므로 다음과 같은 동작이 가능하다.
  - 리터럴에 의해 생성
  - 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
  - 함수의 인자로 전달 가능
  - 함수의 리턴값으로 리턴 가능
  - 동적으로 프로퍼티를 생성 및 할당 가능
- 이같은 특징 때문에 자바스크립트에서의 함수는 일급 객체(First Class)라고 불린다.

#### 변수나 프로퍼티의 값으로 할당
- 함수는 숫자나 문자열처럼 변수나 프로퍼티의 값으로 할당될 수 있다.
    ```js
    // 변수에 함수 할당
    var foo = 100;
    var bar = function () { return 100; };
    console.log(bar()); // 100

    // 프로퍼티에 함수 할당
    var obj = {};
    obj.baz = function () {return 200; }
    console.log(obj.baz()); // 200
    ```

#### 함수 인자로 전달
- 함수는 다른 함수의 인자로도 전달이 가능하다.
  ```js
  // 함수 표현식으로 foo() 함수 생성
  var foo = function(func) {
      func(); // 인자로 받은 func() 함수 호출
  };

  // foo() 함수 실행
  foo(function() {
      console.log('Function can be used as the argument.');
  });

  // (출력값) Function can be used as the argument.
  ```

#### 리턴값으로 활용
- 함수는 다른 함수의 리턴값으로도 활용할 수 있다.
  ```js
  // 함수를 리턴하는 foo() 함수 정의
  var foo = function() {
      return function () {
          console.log('this function is the return value.')
      };
  };

  var bar = foo();
  bar();

  // (출력값) this function is the return value.
  ```

<br>

### 함수 객체의 기본 프로퍼티
- 함수는 일반 객체와는 다르게 추가로 `함수 객체만의 표준 프로퍼티`가 정의되어 있다.
    ```js
    function add(x, y) {
        return x + y;
    }

    console.dir(add);
    ```

    ![예제](/02/4-12.jpg)
    - ECMA5 스크립트 명세서에는 모든 함수가 length와 prototype 프로퍼티를 가져야한다고 기술한다.
    - `name 프로퍼티`는 함수의 이름을 나타낸다.
      - 익명 함수라면 name 프로퍼티는 빈 문자열이 된다.
    - `caller 프로퍼티`는 자신을 호출한 함수를 나타낸다.
    - `arguments 프로퍼티`는 함수를 호출할 때 전달된 인자값을 나타낸다.
      - ECMA 표준에서는 `arguments 객체`를 정의한다.
    - `__proto__ 프로퍼티`는 [[Prototype]]과 같은 개념이다.

- length 프로퍼티
  - ECMA Script에서 정한 모든 함수가 가져야하는 표준 프로퍼티
  - 함수가 정상적으로 실행될 때 기대되는 인자의 개수

- prototype 프로퍼티
  - 모든 함수는 객체로서 prototype 프로퍼티를 가지고 있다.
  - 함수 객체의 prototype 프로퍼티는 모든 객체의 부모를 나타내는 내부 프로퍼티 `[[Prototype]]`과 다르다.