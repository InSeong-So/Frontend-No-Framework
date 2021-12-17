import Component from './root/Component.js';

export default class IntroComponent extends Component {
  constructor(selector, props) {
    super(selector, props);
  }

  template() {
    return `
    <section>
      <div class="container">

        <div data-am-fadeshow="next-prev-navigation">

          <input type="radio" name="css-fadeshow" id="slide-1" />
          <input type="radio" name="css-fadeshow" id="slide-2" />
          <input type="radio" name="css-fadeshow" id="slide-3" />

          <div class="fs-slides">
            <div class="fs-slide">
              <div class="inner-div">
                <h1>Parang Cafe</h1>
                <p><strong>첫 번째 페이지</strong>에요!</p>
              </div>
            </div>
            <div class="fs-slide">
              <div class="inner-div">
                <h1>Parang Cafe</h1>
                <p><strong>두 번째 페이지</strong>에요!</p>
              </div>
            </div>
            <div class="fs-slide">
              <div class="inner-div">
                <h1>Parang Cafe</h1>
                <p><strong>세 번째 페이지</strong>에요!</p>
              </div>
            </div>
          </div>

          <div class="fs-quick-nav">
            <label class="fs-quick-btn" for="slide-1"></label>
            <label class="fs-quick-btn" for="slide-2"></label>
            <label class="fs-quick-btn" for="slide-3"></label>
          </div>

          <div class="fs-prev-nav">
            <label class="fs-prev-btn" for="slide-1"></label>
            <label class="fs-prev-btn" for="slide-2"></label>
            <label class="fs-prev-btn" for="slide-3"></label>
          </div>

          <div class="fs-next-nav">
            <label class="fs-next-btn" for="slide-1"></label>
            <label class="fs-next-btn" for="slide-2"></label>
            <label class="fs-next-btn" for="slide-3"></label>
          </div>

        </div>

      </div>
    </section>
    `;
  }
}
