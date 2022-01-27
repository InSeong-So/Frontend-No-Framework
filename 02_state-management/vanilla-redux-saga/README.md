# redux-saga 구현
> 최종 결과 : v5

## 문제에 봉착한 부분
> 어떻게 구현한 redux의 미들웨어로서 작동하게 할 것인가?

> action을 어떻게 동기적으로 반환할 것인가?

최초 접근법은 단순 객체로서 Curry로 활용해 구현했다.
두 번째는 Generator, yield를 사용하여 구현했다.
세 번재는 두 번째 방법을 확장한다.
네 번째는 세 번째 방법을 확장하고, EventEmitter를 활용했다.

각 방법에는 문제점이 많았고, 최종은 v5이다.
참고 : https://codesandbox.io/embed/thirsty-glade-0g196.