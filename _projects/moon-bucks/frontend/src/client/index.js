import { BACK_USER_SERVER_URL } from '../constants/index.js';
import HTTPClient from './HTTPClient.js';

const httpClient = new HTTPClient({
  mode: 'no-cors',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  referrer: 'no-referrer',
});

const http = {
  async login(params) {
    return await httpClient.post(`/login`, params, null, {
      replaceURL: BACK_USER_SERVER_URL,
      from: `Login is Failed`,
    });
  },
  async checkId({ userId }) {
    return await httpClient.get(`/check/${userId}`, null, {
      replaceURL: BACK_USER_SERVER_URL,
      from: `Login is Failed`,
    });
  },
  async signup(params) {
    return await httpClient.post(`/signup`, params, null, {
      replaceURL: BACK_USER_SERVER_URL,
      from: `Signup is Failed`,
    });
  },
  async load({ category }) {
    return await httpClient.get(`/api/category/${category}/menu`, null, {
      from: `Load "${category}" menu`,
    });
  },
  async create({ category }, params) {
    return await httpClient.post(
      `/api/category/${category}/menu`,
      params,
      null,
      { from: `Create "${category}" "${params.data}"` },
    );
  },
  async update({ category, menuId }, params) {
    return await httpClient.put(
      `/api/category/${category}/menu/${menuId}`,
      params,
      null,
      { from: `Update "${category}" "${params.data}"` },
    );
  },
  async soldOut({ category, menuId }, params) {
    return await httpClient.put(
      `/api/category/${category}/menu/${menuId}/soldout`,
      params,
      null,
      { from: `Sold-Out "${category}" "${params.data}"` },
    );
  },
  async delete({ category, menuId }) {
    return await httpClient.delete(
      `/api/category/${category}/menu/${menuId}`,
      null,
      { from: `Delete "${category}" menu` },
    );
  },
};

export default http;
