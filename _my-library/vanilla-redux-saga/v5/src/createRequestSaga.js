import { put, call } from './index.js';

export const createRequestActionType = action => {
  const ACTION = action.toUpperCase();
  return [ACTION, `${ACTION}_SUCCESS`, `${ACTION}_FAILURE`];
};

const createRequestSaga = (type, request, params) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* () {
    try {
      const data = yield call(request, params);
      yield put({
        type: SUCCESS,
        data: data,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        data: error,
        error: true,
      });
    }
  };
};

export default createRequestSaga;
