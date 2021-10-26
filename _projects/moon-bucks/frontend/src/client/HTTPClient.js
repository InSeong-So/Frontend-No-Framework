import {
  BACK_SERVER_URL,
  LIMIT_DELAY_TWO_SECOND,
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
} from '../constants/index.js';
import HTTPError from './HTTPError.js';

export default class HTTPClient {
  constructor(defaults) {
    this.baseURL = BACK_SERVER_URL;
    this.config = {
      mode: 'same-origin', // no-cors, cors, *same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {},
      redirect: 'follow', // manual, *follow, error
      referrer: 'client', // no-referrer, *client
      ...defaults,
    };
  }

  /**
   * 인스턴스 없이 호출 가능한 request 객체
   *
   * @param {Object} params
   * @returns
   */
  async request(params, options) {
    const { url, body, headers, method } = params;
    const REQUEST_FROM = `${options.from || GET}`;
    const REQUEST_URL = `${options.replaceURL || this.baseURL}${url}`;

    /**
     * 참조 https://developer.mozilla.org/ko/docs/Web/API/AbortController
     */
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      LIMIT_DELAY_TWO_SECOND,
    );
    const config = {
      method,
      headers: new Headers(headers),
      signal: controller.signal,
    };

    if (body) config.body = JSON.stringify(body);

    try {
      const response = await fetch(REQUEST_URL, config);
      return await this.parse(response);
    } catch (error) {
      throw new HTTPError(
        error.message,
        `[ REJECTION ] HTTPError\n> ${REQUEST_FROM}`,
        error.status,
        config,
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * 응답 본문 변환
   * - Fetch API의 Body 믹스인 활용(arrayBuffer(), blob(), json(), text(), formData())
   * - 여기서 사용하는 것은 json() 메서드, @TODO 추후 확장하기
   *
   * @param {Response} response
   * @returns
   */
  async parse(response) {
    const { status } = response;
    try {
      let data = status !== 204 ? await response.json() : null;
      return { data, status };
    } catch (error) {
      return { status };
    }
  }

  /**
   * HTTP: 데이터 반환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  get(url, headers, options) {
    return this.request(
      {
        url,
        headers: this.updateHeaders(headers),
        method: GET,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 생성 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async post(url, body, headers, options) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: POST,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 전체 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async put(url, body, headers, options) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: PUT,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 일부분 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async patch(url, body, headers, options) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: PATCH,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 삭제 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  async delete(url, headers, options) {
    return await this.request(
      {
        url,
        headers: this.updateHeaders(headers),
        method: DELETE,
      },
      options,
    );
  }

  updateHeaders(headers) {
    return { ...this.config.headers, ...headers };
  }
}
