import Component from './root/Component.js';

export default class StoreComponent extends Component {
  template() {
    return `
    <section>
      <div id="map"></div>
    </section>
    <section>
      <div class="wrap">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="찾을 지역을 입력해주세요.">
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div class="store-info-wrapper">
        <div class="store-card">
          <div class="store-card-img"></div>
          <div class="store-card-content">
            <div class="store-card-content-title">한국 프레스 센터</div>
            <div class="store-card-content-address">서울특별시 중구 무교로 15 (무교동)</div>
            <div class="store-card-content-tel">1522-3232</div>
            <div class="store-card-content-location">길찾기</div>
          </div>
        </div>
        <div class="store-card">
          <div class="store-card-img"></div>
          <div class="store-card-content">
            <div class="store-card-content-title">한국 프레스 센터</div>
            <div class="store-card-content-address">서울특별시 중구 무교로 15 (무교동)</div>
            <div class="store-card-content-tel">1522-3232</div>
            <div class="store-card-content-location">길찾기</div>
          </div>
        </div>
        <div class="store-card">
          <div class="store-card-img"></div>
          <div class="store-card-content">
            <div class="store-card-content-title">한국 프레스 센터</div>
            <div class="store-card-content-address">서울특별시 중구 무교로 15 (무교동)</div>
            <div class="store-card-content-tel">1522-3232</div>
            <div class="store-card-content-location">길찾기</div>
          </div>
        </div>
    </section>
    `;
  }

  mount() {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }
}
