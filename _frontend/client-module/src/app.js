export default class HTTPClient {
  constructor(options, headers) {
    this.options = {
      baseURL: options.baseURL,
      mode: options.mode || 'no-cors',
      cache: options.cache || 'no-cache',
      credentials: options.credentials || 'same-origin',
      redirect: options.redirect || 'follow',
      referrer: options.referrer || 'no-referrer',
    };
    this.headers = {
      'Content-Type': headers.type || 'application/json',
      'Access-Control-Allow-Origin': headers.cors || '*',
    };
  }

  /**
   * 인스턴스 없이 호출 가능한 request 객체
   *
   * @param {*} params
   * @returns
   */
  async request(params) {
    const { method = 'GET', url, headers = this.headers, body } = params;
    const config = {
      method,
      headers: new Headers(headers),
    };

    if (body) {
      config.body = JSON.stringify(body);
    }
    const response = await fetch(`${this.options.baseURL}${url}`, config);
    return this.parseResponse(response);
  }

  async parseResponse(response) {
    const { status } = response;
    let data = status !== 204 ? await response.json() : null;

    return { status, data };
  }

  async get(url, headers = this.headers) {
    return await this.request({
      url,
      headers,
      method: 'GET',
    }).data;
  }

  async post(url, headers = this.headers, body) {
    return await this.request({
      url,
      headers,
      method: 'POST',
      body,
    }).data;
  }
  async put(url, headers = this.headers) {
    return await this.request({
      url,
      headers,
      method: 'PUT',
    }).data;
  }
  async patch(url, headers = this.headers, body) {
    return await this.request({
      url,
      headers,
      method: 'PATCH',
      body,
    }).data;
  }

  async delete(url, headers = this.headers) {
    return await this.request({
      url,
      headers,
      method: 'DELETE',
    }).data;
  }
}
