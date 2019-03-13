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

<br>

### 객체 프로퍼티 읽기/쓰기/갱신
- 객체는 새로운 값을 가진 프로퍼티를 생성할 수 있다.
  - 또한 프로퍼티에 접근해 해당 값을 읽거나 원하는 값으로 갱신할 수 있다.
    ```js
    // 객체 리터럴 방식을 통한 foo 객체 생성
    var foo = {
        name : 'foo',
        major : 'computer science'
    };

    // 객체 프로퍼티 읽기
    console.log(foo.name);              // (출력값) foo
    console.log(foo['name']);           // (출력값) foo
    console.log(foo.nickname);          // (출력값) undefined

    // 객체 프로퍼티 갱신
    foo.major = 'electronics engineering';
    console.log(foo.major);             // (출력값) electronics engineering
    console.log(foo['major']);          // (출력값) electronics engineering

    // 객체 프로퍼티 동적 생성
    foo.age = 30;
    console.log(foo.age);               // (출력값) 30

    // 대괄호 표기법만을 사용해야 할 경우
    foo['full-name'] = 'foo bar';
    console.log(foo['full-name']);      // (출력값) foo bar
    console.log(foo.full-name);         // (출력값) NaN
    console.log(foo.full);              // (출력값) undefined
    console.log(name);                  // (출력값) undefined
    ```
    - 프로퍼티 읽기
      - 객체의 프로피터 접근은 대괄호 표기법, 마침표 표기법으로 가능하다.

    <br>

    - 프로퍼티 갱신
      - 프로퍼티에 접근해 객체의 기존 프로퍼티값을 갱신할 수 있다.

    <br>

    - 프로퍼티 동적 생성
      - 객체가 생성된 후에도 동적으로 프로퍼티를 생성해 해당 객체에 추가할 수 있다.
      - 자바스크립트 객체의 프로퍼티에 값을 할당할 때, 프로퍼티가 이미 있을 경우는 해당 프로퍼티의 값이 갱신되지만, 객체의 해당 프로퍼티가 없을 경우에는 새로운 프로퍼티가 동적으로 생성된 후 값이 할당된다.

    <br>

    - 대괄호 표기법만을 사용해야 하는 경우
      - 접근하려는 프로퍼티가 표현식이거나 예약어일 경우 대괄호 표기법만을 사용해야 한다.

    <br>

    - NaN(Not a Number)
      - 수치 연산을 해서 정상적인 값을 얻지 못할 때 출력되는 값이다.

<br>

### for in 문과 객체 프로퍼티 출력
- for in 문으로 객체에 포함된 모든 프로퍼티에 대해 루프를 수행할 수 있다.
    ```js
    // 객체 리터럴을 통한 foo 객체 생성
    var foo = {
        name: 'foo',
        age: 30,
        major: 'computer science'
    };

    // for in 문을 이용한 객체 프로퍼티 출력
    var prop;
    for (prop in foo) {
        console.log(prop, foo[prop]);
    }
    ```

<br>

### 객체 프로퍼티 삭제
- 객체의 프로퍼티는 delete 연산자를 이용해 즉시 삭제할 수 있다.
- delete 연산자는 객체의 프로퍼티를 삭제할 뿐 객체 자체를 삭제하지 못한다.
    ```js
    // 객체 리터럴을 통한 foo 객체 생성
    var foo = {
        name: 'foo',
        nickname: 'babo'
    };

    console.log(foo.nickname);      // (출력값) babo
    delete foo.nickname;            // (출력값) nickname 프로퍼티 삭제
    console.log(foo.nickname);      // (출력값) undefined

    delete foo;                     // (출력값) foo 객체 삭제 시도
    console.log(foo.name);          // (출력값) foo
    ```

<br>

## 참조 타입의 특성
- 기본 타입과 null, undefined 5가지를 제외한 모든 값은 객체이다.
- 참조 타입은 객체의 모든 연산이 실제 값이 아닌 참조값으로 처리된다.
    ```js
    var objA = {
        val: 40
    };

    console.log(objA.val);          // (출력값) 40
    console.log(objB.val);          // (출력값) 40

    objB.val = 50;
    console.log(objA.val);          // (출력값) 50
    console.log(objB.val);          // (출력값) 50
    ```
    - objA 변수는 객체 자체가 아닌 생성된 객체를 가리키는 참조값을 저장한다.
    - objB에 objA 값을 할당함으로서 변수 objB에도 같은 객체의 참조값이 저장된다.
      - 즉, 동일한 객체를 가리키는 참조값을 가지게 된다.
    - objB.val 값을 40에서 50으로 갱신했다.
      - objA도 objB와 동일한 객체를 참조하므로 objA.val 값도 50이다.

### 객체 비교
- 동등 연산자(==)를 사용하면 두 객체의 프로퍼티값이 아닌 참조값을 비교한다.
    ```js
    var a = 100;
    var b = 100;

    var objA = { value: 100 };
    var objB = { value: 100 };
    var objC = objB;

    console.log(a == b);            // (출력값) true
    console.log(objA == objB);      // (출력값) false
    console.log(objB == objC);      // (출력값) true
    ```
    - 기본 타입은 동등 연산자(==)를 이용하면 `값`을 비교한다.
    - 동등 연산자(==)로 객체를 비교하면 참조값이 같아야 `true`이다.

<br>

### 참조에 의한 함수 호출 방식
- 기본 타입의 경우 `값에 의한 호출(call by value)` 방식으로 동작한다.
  - 함수를 호출할 때 인자로 기본 타입의 값을 넘길 경우, 호출된 함수의 매개변수로 `복사된 값`이 전달된다.
    - 함수 내부에서 매개변수를 이용해 값을 변경해도 실제로 호출된 변수의 값이 변경되지는 않는다.

<br>

- 참조 타입의 경우 `참조에 의한 호출(call by reference)` 방식으로 동작한다.
  - 함수를 호출할 때 인자로 참조 타입 객체를 전달할 경우, 객체의 프로퍼티값이 함수의 매개변수로 복사되지 않고 인자로 넘긴 `객체의 참조값`이 그대로 함수 내부에 전달된다.
    - 함수 내부에서 참조값을 이용해 인자로 넘긴 실체 객체의 값을 변경할 수 있다.

```js
var a = 100;
var objA = { value: 100 };

function changeArg(num, obj) {
    num = 200;
    obj.value = 200;

    console.log(num);
    console.log(obj);
}

changeArg(a, objA);

console.log(a);
console.log(objA);
```

```
[출력결과]
200
{ value: 200 }
100
{ value: 200 }
```

<br>

## 프로토타입
- 자바스크립트의 `모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다.`
  - 객체지향의 상속 개념과 같다.
    - 따라서, 부모 객체의 프로퍼티를 자신의 것처럼 쓸 수 있다.

<br>

- 자바스크립트는 이러한 부모 객체를 `프로토타입 객체`(줄여서 `프로토타입`)라고 부른다.
    ```js
    var foo = {
        name: 'foo',
        age: 30
    };

    console.log(foo.toString());

    console.dir(foo);
    ```
    - 생성한 foo 객체는 toString() 메서드가 없으므로 에러가 발생해야 한다.
      - 그러나 foo 객체의 프로토타입에 toString() 메서드가 이미 정의되어 있기에 foo 객체가 상속처럼 toString() 메서드를 호출했기 때문이다.

    - 실행 결과를 살펴보면 객체 리터럴로 생성한 name과 age 프로퍼티 이외에도 foo 객체에 `__proto__` 프로퍼티가 있다. 이 프로퍼티가 foo 객체의 부모인 `프로토타입 객체`를 가리킨다.

<br>

- ECMAScript 명세서는 `모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]라는 숨겨진 프로퍼티를 가진다`고 설명한다.
  - 크롬 브라우저에서는 `__proto__`가 `[[Prototype]]` 프로퍼티이다.
  - 즉, 객체는 자신의 부모 객체를 `__proto__`라는 내부 프로퍼티로 연결한다.

<br>

- 모든 객체의 프로토타입은 자바스크립트의 룰에 따라 객체를 생성할 때 결정된다.
- 객체를 생성할 때 결정된 프로토타입 객체는 임의의 다른 객체로 변경할 수 있다.
  - 즉, 부모 객체를 동적으로 바꿀 수 있다.

<br>

## 배열