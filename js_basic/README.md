# 자바스크립트 데이터 타입과 연산자
- 자바스크립트 데이터 타입
  - 기본 타입
    - 숫자(Number)
    - 문자열(String)
    - 불린값(Boolean)
    - undefined
    - null

<br>

  - 참조 타입
    - 객체(Object)
      - 배열(Array)
      - 함수(Function)
      - 정규표현식

## 자바스크립트 기본 타입
- 기본 타입은 그 자체가 하나의 값을 나타낸다는 특징이 있다.
    ```js
    // 숫자 타입
    var intNum = 10;
    var floatNum = 0.1;

    // 문자열 타입
    var singleQuoteStr = 'single quote string';
    var doubleQuoteStr = "double quote string";
    var singleChar = 'a';

    // 불린 타입
    var boolVar = true;

    // undefined 타입
    var emptyVar;

    // null 타입
    var nullVar = null;

    console.log(
        typeof intNum,
        typeof floatNum,
        typeof singleQuoteStr,
        typeof doubleQuoteStr,
        typeof boolVar,
        typeof nullVar,
        typeof emptyVar
    );
    ```
    - 출력 결과
      - > number number string string boolean object undefined

<br>

- 자바스크립트는 느슨한 타입 체크 언어이다.
  - 변수를 선언할 때 타입을 미리 정하지 않고 var라는 한 가지 키워드로만 선언한다.
  - 선언된 변수는 어떤 타입의 데이터를 저장하는 것이 가능하다.

### 숫자
- 자바스크립트에서는 하나의 숫자형만 존재한다.
  - 모든 숫자는 64bit 부동 소수점 형태로 저장된다.
  - 이는 C언어의 double 타입과 유사하다.

<br>

- 자바스크립트에서는 모든 숫자를 실수로 처리하므로 나눗셈 연산 시 주의해야 한다.
    ```js
    var num = 5 / 2;

    console.log(num);               // (출력값) 2.5
    console.log(Math.floor(num));   // (출력값) 2
    ```

<br>

### 문자열
- 문자열은 작은 따옴표(')나 큰 타옴표(")로 생성한다.
- C언어의 char 타입처럼 문자 하나만을 나타내는 데이터 타입은 존재하지 않는다.
    ```js
    // str 문자열 생성
    var str = 'test';
    console.log(str[0], str[1], str[2], str[3]);    // (출력값) test

    // 문자열의 첫 글자를 대문자로 변경?
    str[0] = 'T';
    console.log(str);                               // (출력값) test
    ```

<br>

- 문자열은 문자 배열처럼 인덱스를 이용해 접근할 수 있다.
- 자바스킄립트에서는 한 번 생성된 문자열은 읽기만 가능하며 수정은 불가능하다.

### 불린값
- 자바스크립트는 true와 false 값을 나타내는 불린 타입이 존재한다.

### null undefined
- 두 타입은 모두 자바스크립트에서 '값이 비어있음'을 나타낸다.
  - 기본적으로 값이 할당되지 않은 변수는 undefined 타입이다.
  - undefined 타입의 변수는 변수 자체의 값 또한 undefined이다.
  - `따라서 undefined는 타입이자, 값을 나타낸다.`

<br>

- null 타입 변수에 typeof 연산자를 사용하면 Object를 반환한다.
  - 일치 연산자(===)를 사용해서 변수의 값을 직접 확인해야 한다.
    ```js
    // null 타입 변수 생성
    var nullVar = null;

    console.log(typeof nullVar === null);   // (출력값) false
    console.log(nullVar === null);          // (출력값) true
    ```

## 자바스크립트 참조 타입(객체 타입)
- 기본 타입을 제외한 모든 값은 객체이다.
  - `이름(key) : 값(value)` 형태의 프로퍼티를 저장하는 컨테이너이다.
  - 컴퓨터 과학 분야의 해시(Hash)라는 자료구조와 유사하다.

<br>

- 참조 타입인 객체는 여러 개의 프로퍼티들을 포함할 수 있다.
  - 객체의 프로퍼티는 기본 타입의 값을 포함하거나, 다른 객체를 가리킬 수도 있다.

<br>

- 프로퍼티의 성질에 따라 객체의 프로퍼티는 함수로 포함할 수 있다.
  - 이러한 프로퍼티를 `메서드`라고 부른다.

### 객체 생성
- 자바스크립트는 클래스라는 개념이 없다.
  - 객체 리터럴이나 생성자 함수 등 별도의 생성 방식이 존재한다.

<br>

- 객체를 생성하는 방법
  - 기본 제공 Object() 객체 생성자 함수를 이용하는 바업
  - 객체 리터럴을 이용하는 방법
  - 생성자 함수를 이용하는 방법

<br>

#### Object() 생성자 함수 이용
- 자바스크립트에서는 내장 Object() 생성자 함수를 제공한다.
    ```js
    // Object()를 이용해서 foo 빈 객체 생성
    var foo = new Object();

    //foo 객체 프로퍼티 생성
    foo.name = 'foo';
    foo.age = 30;
    foo.gender = 'male';

    console.log(typeof foo);    
    // (출력값) object
    console.log(foo);
    // (출력값) {name: 'foo', age: 30, gender: 'male'}
    ```

<br>

#### 객체 리터럴 방식 이용
- 객체 리터럴이란 객체를 생성하는 표기법을 의미한다.
  - 리터럴이란 용어의 의미는 표기법이다.
  - 중괄호({})를 이용해서 객체를 생성한다.
  - {} 안에 아무것도 적지 않은 경우 빈 객체가 생성된다.
  - 중괄호 안에 "프로퍼티 이름" : " 프로퍼티 값" 형태로 표기하면 프로퍼티가 추가된 객체를 생성한다.
    - 프로퍼티 이름은 문자열이나 숫자가 올 수 있다.
    - 프로퍼티 값은 자바스크립트의 값을 나타내는 어떤 표현식도 올 수 있다.
    - 이 값이 함수라면 이런 프로퍼티를 메서드라고 부른다.
    ```js
    // 객체 리터럴 방식으로 foo 객체 생성
    var foo = {
        name : 'foo',
        age : 30,
        gender : 'male'
    };

    console.log(typeof foo);
    // (출력값) obejct
    console.log(foo);
    // (출력값) { name: 'foo', age: '30', gender: 'male' }
    ```

<br>

#### 생성자 함수 이용
- 함수를 통해서도 객체를 생성할 수 있다.
  - 이렇게 객체를 생성하는 함수를 생성자 함수라고 부른다.
  - 뒷 부분에서 자세히 살펴보자.