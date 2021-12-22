import { put, call } from './index.js';

export const createRequestActionType = action => {
  const ACTION = action.toUpperCase();
  return [ACTION, `${ACTION}_SUCCESS`, `${ACTION}_FAILURE`];
};

const createRequestSaga = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }
  };
};

export default createRequestSaga;
