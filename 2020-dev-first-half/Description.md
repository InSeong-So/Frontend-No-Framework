## 주제(시나리오)
고양이를 좋아하는 당신은 고양이 사진 전용 검색 웹사이트를 운영하고 있었습니다. 지금까지는 혼자 소소하게 운영해왔는데, 생각보다 고양이 사진을 원하는 사람들이 많아지면서 해결해야 할 문제들이 하나씩 드러나기 시작했어요. 몇 개의 문제는 금세 고칠 수 있지만, 기존 코드를 자세히 봐야만 고칠 수 있는 문제들도 있어서 조금 골치아픈 상황! 심지어 최대 4시간 내에 수정한 뒤 배포를 해야만 합니다. 당신이라면 기존 서비스의 여러 버그를 제한시간 내에 고치고, 유저를 위한 추가 기능까지 구현해볼 수 있을까요? 도전해보세요!

<br>

## 과제 설명
- thecatapi 에서 크롤링한 데이터를 이용해 이미지를 검색하는 베이스 코드가 주어집니다.
- 베이스 코드는 모두 ES6 클래스 기반으로 작성되어 있으며, 이 코드에는 여러 개의 버그가 존재합니다. 요구사항을 잘 읽고, 버그를 하나씩 해결해주세요.

<br>

## 수행 기술
- JavaScript(ES6)
- 설치되어있는 모듈(node_modules) 외에 다른 외부 라이브러리는 사용하지 않도록 합니다. 예를들어 jQuery, Webpack, Lodash, Axios, Angular, React, Vue, Immutable-js, Ramda 등을 사용할 수 없습니다.

<br>

## 요구사항
**참고** 요구사항의 순서는 난이도와 상관이 없음

<br>

## HTML, CSS 관련
- 현재 HTML 코드가 전체적으로 <div> 로만 이루어져 있습니다. 이 마크업을 시맨틱한 방법으로 변경해야 합니다.
- 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 적절히 변경해주어야 합니다.
  - 992px 이하: 3개
  - 768px 이하: 2개
  - 576px 이하: 1개
- 다크 모드(Dark mode)를 지원하도록 CSS를 수정해야 합니다.
  - CSS 파일 내의 다크 모드 관련 주석을 제거한 뒤 구현합니다.
  - 모든 글자 색상은 #FFFFFF , 배경 색상은 #000000 로 한정합니다.
  - 기본적으로는 OS의 다크모드의 활성화 여부를 기반으로 동작하게 하되, 유저가 테마를 토글링 할 수 있도록 좌측 상단에 해당 기능을 토글하는 체크박스를 만듭니다.

<br>

## 이미지 상세 보기 모달 관련
- 디바이스 가로 길이가 768px 이하인 경우, 모달의 가로 길이를 디바이스 가로 길이만큼 늘려야 합니다.
- 필수 이미지를 검색한 후 결과로 주어진 이미지를 클릭하면 모달이 뜨는데, 모달 영역 밖을 누르거나 / 키보드의 ESC 키를 누르거나 / 모달 우측의 닫기(x) 버튼을 누르면 닫히도록 수정해야 합니다.
- 모달에서 고양이의 성격, 태생 정보를 렌더링합니다. 해당 정보는 /cats/:id 를 통해 불러와야 합니다.
- 추가 모달 열고 닫기에 fade in/out을 적용해 주세요.

<br>

## 검색 페이지 관련
- 페이지 진입 시 포커스가 input 에 가도록 처리하고, 키워드를 입력한 상태에서 input 을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
- 필수 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 유저에게 알리는 UI를 추가해야 합니다.
- 필수 검색 결과가 없는 경우, 유저가 불편함을 느끼지 않도록 UI적인 적절한 처리가 필요합니다.
- 최근 검색한 키워드를 SearchInput 아래에 표시되도록 만들고, 해당 영역에 표시된 특정 키워드를 누르면 그 키워드로 검색이 일어나도록 만듭니다. 단, 가장 최근에 검색한 5개의 키워드만 노출되도록 합니다.
- 페이지를 새로고침해도 마지막 검색 결과 화면이 유지되도록 처리합니다.
- 필수 SearchInput 옆에 버튼을 하나 배치하고, 이 버튼을 클릭할 시 /api/cats/random50 을 호출하여 화면에 뿌리는 기능을 추가합니다. 버튼의 이름은 마음대로 정합니다.
- lazy load 개념을 이용하여, 이미지가 화면에 보여야 할 시점에 load 되도록 처리해야 합니다.
- 추가 검색 결과 각 아이템에 마우스 오버시 고양이 이름을 노출합니다.

<br>

## 스크롤 페이징 구현
- 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 페이지를 로딩하도록 만들어야 합니다.

<br>

## 랜덤 고양이 배너 섹션 추가
- 현재 검색 결과 목록 위에 배너 형태의 랜덤 고양이 섹션을 추가합니다.
- 앱이 구동될 때 `/api/cats/random50` api를 요청하여 받는 결과를 별도의 섹션에 노출합니다.
- 검색 결과가 많더라도 화면에 5개만 노출하며 각 이미지는 좌, 우 슬라이드 이동 버튼을 갖습니다.
- 좌, 우 버튼을 클릭하면, 현재 노출된 이미지는 사라지고 이전 또는 다음 이미지를 보여줍니다.(트렌지션은 선택)

<br>

## 코드 구조 관련
- ES6 module 형태로 코드를 변경합니다.
  - webpack , parcel 과 같은 번들러를 사용하지 말아주세요.
  - 해당 코드 실행을 위해서는 http-server 모듈을(로컬 서버를 띄우는 다른 모듈도 사용 가능) 통해 index.html 을 띄워야 합니다.
- API fetch 코드를 async , await 문을 이용하여 수정해주세요. 해당 코드들은 에러가 났을 경우를 대비해서 적절히 처리가 되어있어야 합니다.
- 필수 API 의 status code 에 따라 에러 메시지를 분리하여 작성해야 합니다. 아래는 예시입니다.
  ```js
  const request = async (url:string) => {
    try {
      const result = await fetch(url);
      return result.json();
    } catch (e) {
      console.warn(e);
    }
  };

  const api = {
    fetchGif: keyword => {
      return request(`${API_ENDPOINT}/api/gif/search?q=${keyword}`);
    },
    fetchGifAll: () => {
      return request(`${API_ENDPOINT}/api/gif/all`);
    },
  };

  ```
- SearchResult 에 각 아이템을 클릭하는 이벤트를 Event Delegation 기법을 이용해 수정해주세요.
- 컴포넌트 내부의 함수들이나 Util 함수들을 작게 잘 나누어주세요.

<br>

## API
### 1. GET /cats/random50
**Request parameter**
> None

<hr>

**Query paramter**
> None

<hr>

**Response**
> Success 200

|Field name|Type|Description|
|-----|-----|-----|
|data|Array|랜덤한 50개의 고양이 사진 목록입니다.|

```js
HTTP/1.1 200 OK
{
  "data": [{
    id: string
    url: string
    name: string
  }]
}
```

<hr>
<br>

### 2. GET /cats/search
**Request parameter**
> None

<hr>

**Query paramter**

|Field name|Type|Description|
|-----|-----|-----|
|q|string|고양이의 품종(영어/한글)|

<hr>

**Response**
> Success 200

|Field name|Type|Description|
|-----|-----|-----|
|data|Array|Keyword로 검색된 고양이 사진 목록입니다.|

```js
HTTP/1.1 200 OK
{
  "data": [{
    id: string
    url: string
    name: string
  }]
}
```

<hr>
<br>

### 3. GET /cats/:id
**Request parameter**

|Field name|Type|Description|
|-----|-----|-----|
|id|string|고양이 사진의 id값 입니다.|

<hr>

**Query paramter**
> None

<hr>

**Response**
> Success 200

|Field name|Type|Description|
|-----|-----|-----|
|data|Object|Id로 검색된 고양이 사진 입니다.|

```js
HTTP/1.1 200 OK
{
  "data": {
    name: string
    id: string
    url: string
    width: number
    height: number
    temperament: string
    origin: string
  }
}
```

<br>
<hr>