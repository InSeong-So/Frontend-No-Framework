# 커링(Curring)
> 다중 인수를 갖는 함수를 단일 함수를 갖는 함수들의 함수열로 바꾸는 것입니다.

## 커링이 뭘까요?

```js
const curried = arg1 => arg2 => arg3 => { ... };
```

1. 커리 함수는 한 번에 하나씩, 여러 인수를 사용합니다.
2. 인수가 전달될 때마다 다음 인수를 받아들이는 새로운 함수를 반환합니다. 모든 인수가 통과될 때까지 이 작업을 수행하며 최종적으로 결과값을 반환합니다.

## 여기 이해해야 할 몇 가지 중요한 내용이 있어요.
- 어떤 인수들 중 일부만 전달된 커리 함수는 불완전하며 부분 응용 프로그램이라고 불립니다.
- 커리 함수의 각 단계는 함수의 클로저 스코프에 접근할 수 있습니다. 즉, 두 번째 인수를 전달하면 이전 인수와 커리 함수의 현재 내부 상태에 접근할 수 있습니다.

## 정리
커리 함수는 모두 구성에 관한 내용입니다. 커리 패턴을 사용하면 클로저 스코프의 사전에 정의된 특정 데이터로 새로운 기능을 만들 수 있습니다. 이 기능을 사용하여 보다 간결하고 성능이 뛰어난 코드를 작성하는 몇 가지 예를 살펴볼까요?

## 반복 제거
커링을 사용하여 아래의 코드를 개선할 수 있습니다. createURL이 반복되고 있죠? 이는 URL 인수를 바꾸면 금방 해결할 수 있습니다.

- 변경 전
  ```js
  const createURL = (baseURL, path) => {
    const protocol = "https";
    return `${protocol}://${baseURL}/${path}`;
  };

  // create URLs for our main site
  const homeURL = createURL("mysite.com", "");
  const loginURL = createURL("mysite.com", "login");
  const productsURL = createURL("mysite.com", "products");
  const contactURL = createURL("mysite.com", "contact-us");
  ```

- 변경 후
  ```js
  const createURL = baseURL => {
    const protocol = "https";

    // we now return a function, that accepts a 'path' as an argument
    return path => {
      return `${protocol}://${baseURL}/${path}`;
    };
  };

  // we create a new functions with the baseURL value in it's closure scope
  const createSiteURL = createURL("mysite.com");
  const createCareersURL = createURL("mysite-careers.com");

  // create URLs for our main site
  const homeURL = createSiteURL("");
  const loginURL = createSiteURL("login");
  const productsURL = createSiteURL("products");
  const contactURL = createSiteURL("contact-us");
  ```

커링은 createSiteURL와 createCareersURL이라는 새로운 기능을 구성하게 해줍니다. 이 기능은 클로저 스코프의 'mysite.com' 및 'mysite-careers.com' 데이터로 미리 채워져 있죠. 이건 우리가 같은 내용을 반복적으로 선언할 필요가 없다는 것을 의미합니다.

<br>

## 고비용 프로제스의 분리
우리는 위와 유사한 방법으로 느리거나 비용이 많이 드는 프로세스를 분리할 수 있습니다.

아래 코드는 큰 데이터 테이블을 필터링하고 정렬하는 기능입니다. 예를 들어 당사의 대용량 데이터는 현재 우리 회사가 전 세계로 배송하고 있는 소포의 데이터베이스입니다. 우리는 주어진 국가의 모든 소포 목록을 받아서 각각의 소포가 만들어진 날짜별로 분류하고 싶습니다.

- 변경 전
  ```js
  // given a database of global parcels like this...
  const allGlobalParcels = [
    {
      created: 576424800000,
      location: 'aus',
      properties: {},
    },
    {
      created: 1558163267311,
      location: 'us',
      properties: {},
    },
    //...2701201201 more items
  ];

  const sortParcelsByCountry = (parcels, country, order) => {
    // 1. Filter our list to only include parcels from 'country;
    const countryParcels = parcels.filter(parcel => parcel.location === country);

    // 2. Sort the list of parcels by date created
    const sortedResult = [...countryParcels].sort((a, b) => {
      if (order === 'ascending') return a.created - b.created;
      // by default return packages by descending order
      return b.created - a.created;
    });

    return sortedResult;
  };

  const ausParcelsAsc = sortParcelsByCountry(
    allGlobalParcels,
    'aus',
    'ascending',
  );
  const ausParcelsDsc = sortParcelsByCountry(
    allGlobalParcels,
    'aus',
    'descending',
  );
  ```

이 코드는 이전과 같은 파라미터가 반복되는 문제가 있습니다. 또한 ausParcelsAsc, ausParcelsDsc 함수를 호출할 때마다 대량의 데이터를 필터링하죠. 이로 인해 소프트웨어에 불필요한 성능 병목 현상이 발생할 수 있습니다. 자, 커링을 사용해봅시다.

- 변경 후
  ```js
  // given a database of global parcels like this...
  const allGlobalParcels = [
    {
      created: 576424800000,
      location: 'aus',
      properties: {},
    },
    {
      created: 1558163267311,
      location: 'us',
      properties: {},
    },
    // ...2701201201 more items
  ];

  const sortParcelsByCountry = parcels => country => {
    // 1. Filter our list to only include parcels from 'country;
    const countryParcels = parcels.filter(parcel => parcel.location === country);

    // we now return a function that sorts the parcels by date created
    return order => {
      // 2. Sort the list of packages by date
      const sortedResult = [...countryParcels].sort((a, b) => {
        if (order === 'ascending') return a.created - b.created;

        // by default return packages by descending order
        return b.created - a.created;
      });

      return sortedResult;
    };
  };

  // we create a new function with the filtered list of parcels by country in it's closure scope
  const sortAusParcelsBy = sortParcelsByCountry(allGlobalParcels)('aus');

  const ausParcelsAsc = sortAusParcelsBy('ascending');
  const ausParcelsDsc = sortAusParcelsBy('descending');
  ```

위의 내용은 sortAusParcelsBy 함수를 만들 때 전역 구획 데이터에 대한 고비용 필터 프로세스가 어떻게 한 번만 수행되는지 알려줍니다. sortAusParcelsBy 함수를 실행하면 클로저 스코프에서 필터링된 목록에 액세스할 수 있습니다. 이것은 우리가 목록을 분류해야 할 때마다가 아니라, 단 한 번만 걸러내면 된다는 것을 의미한다.

<br>

## 단점?!
- 커링은 모든 개발자들이 이해하고 있지 않습니다.
  - 이 기술에 익숙하지 않은 개발자들은 커링을 사용하는 코드를 어려워 할 것입니다. 또한 전통적인 함수보다 구문의 이해가 더욱 어려우므로 혼동을 일으킬 수 있죠.

- 남용하기 쉽습니다.
  - 모든 함수들을 커링할 수 있지만, 개발자들은 더 간단한 구성 방법이 있을 때만 커링을 사용해야 합니다. 질문을 해봅시다. `재사용 가능한 기능 함수들이 필요한가요? 함수가 하나의 인수만 가질 수 있도록 해야 하나요?` 만약 당신이 이 두 질문에 "아니오"라고 대답했다면, 커링을 도입할 필요는 없습니다.

<br>
<hr>

[원문](https://papago.naver.com/?sk=en&tk=ko&hn=0&st=What%20are%20the%20bad%20parts%3F%0AWith%20great%20power%20comes%20great%20responsibility%20%E2%80%94%20Batman%E2%80%99s%20Dad%0AHere%20are%20some%20things%20I%20have%20learnt%20from%20working%20more%20with%20currying.%0ACurrying%20isn%E2%80%99t%20widely%20understood%20by%20all%20developer)