import Component from './root/Component.js';

export default class StoreComponent extends Component {
  initialized() {
    this._stores = [];
  }

  template() {
    return `
    <section>
      <div id="map"></div>
    </section>
    <section>
      <div class="wrap">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="찾을 지역을 입력해주세요.">
          <button type="submit" class="searchButton"><i class="fa fa-search"></i></button>
        </div>
      </div>
      ${
        !this.isExistsSearchedData
          ? `<coffee-animation></coffee-animation>`
          : `<div class="store-info-wrapper">
            ${this.searchList
              .map(({ placeName, addressName }) => {
                return `
              <div class="store-card">
                <div class="store-card-img"></div>
                <div class="store-card-content">
                  <div class="store-card-content-title">${placeName}</div>
                  <div class="store-card-content-address">${addressName}</div>
                  <div class="store-card-content-tel">1522-3232</div>
                  <div class="store-card-content-location">길찾기</div>
                </div>
              </div>`;
              })
              .join('')}
            </div>`
      }
    </section>
    `;
  }

  get isExistsSearchedData() {
    return this._stores.length ? true : false;
  }

  getGeolocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async mount() {
    const { coords } = await this.getGeolocation();
    const { latitude, longitude } = coords;

    /* eslint-disable no-undef */
    const container = this.utils.$('#map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 2, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // // 검색 엔진 추천 기능 구현하기
    // const ul = document.querySelector('.pop_rel_keywords');
    // const searchInput = document.querySelector('.search_input');
    // const relContainer = document.querySelector('.rel_search');
    // let cache = '';

    // const checkInput = () => {
    //   const beforeInput = searchInput.value;
    //   setTimeout(() => {
    //     if (searchInput.value === beforeInput) {
    //       console.log('입력멈춤');
    //       loadData(searchInput.value);
    //       checkInput();
    //     } else {
    //       console.log('입력변함');
    //       checkInput();
    //     }

    //     if (searchInput.value === '') {
    //       relContainer.classList.add('hide');
    //     } else {
    //       relContainer.classList.remove('hide');
    //     }
    //   }, 500);
    // };

    // const loadData = input => {
    //   const url = `https://completion.amazon.com/api/2017/suggestions?session-id=135-3077052-6015425&customer-id=&request-id=DMRETXPQ3PZJQ5TKYSWX&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${input}&event=onFocusWithSearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615280967091`;

    //   if (cache === url) return;
    //   else {
    //     cache = url;
    //     fetch(url)
    //       .then(res => res.json())
    //       .then(res => fillSearch(res.suggestions));
    //   }
    // };

    // const fillSearch = suggestArr => {
    //   ul.innerHTML = '';
    //   suggestArr.forEach((el, idx) => {
    //     const li = document.createElement('li');
    //     li.innerHTML = el.value;
    //     ul.appendChild(li);
    //   });
    // };

    // checkInput();
  }
}
