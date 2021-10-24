export default class HTTPClient {
  constructor(defaults) {
    this.headers = {
      baseURL: defaults.baseURL,
      mode: defaults.mode || 'no-cors',
      cache: defaults.cache || 'no-cache',
      credentials: defaults.credentials || 'same-origin',
      redirect: defaults.redirect || 'follow',
      referrer: defaults.referrer || 'no-referrer',
    };
  }

  async request(params) {
    const { method = 'GET', url, headers = {}, body } = params;
    const config = {
      method,
      headers: new Headers(headers),
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    return this.parseResponse(response);
  }

  async parseResponse(response) {
    const { status } = response;
    let data = status !== 204 ? await response.json() : null;

    return { status, data };
  }

  async getRequest(url, headers) {
    return await this.request({
      url,
      headers,
      method: 'GET',
    }).data;
  }

  async postRequest(url, body, headers) {
    return await this.request({
      url,
      headers,
      method: 'POST',
      body,
    }).data;
  }
  async putRequest(url, body, headers) {
    return await this.request({
      url,
      headers,
      method: 'PUT',
    }).data;
  }
  async patchRequest(url, body, headers) {
    return await this.request({
      url,
      headers,
      method: 'PATCH',
      body,
    }).data;
  }

  async deleteRequest(url, headers) {
    return await this.request({
      url,
      headers,
      method: 'DELETE',
    }).data;
  }
}
