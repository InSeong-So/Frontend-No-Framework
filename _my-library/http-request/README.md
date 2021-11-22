## HTTP 클라이언트 구현하기
> HTTP 클라이언트의 핵심은 request 메서드이다.


### XMLHttpRequest
> 콜백 기반의 HTTP 클라이언트

1. 새로운 XMLHttpRequest 객체 생성
2. 특정 URL로 요청을 초기화
3. 요청(헤더 설정, 타임아웃 등)을 구성
4. 요청 전송
5. 요청이 끝날 때까지 대기
   1. 요청이 성공적으로 끝나면 onload 콜백 호출
   2. 요청이 오류로 끝나면 onerror 콜백 호출
   3. 요청이 타임아웃으로 끝나면 ontimeout 콜백 호출

<br>

### Fetch
> 원격 리소스에 접근하고자 만들어진 새로운 API

<br>

### Axios
> 브라우저와 Node.js에서 바로 사용할 수 있는 API