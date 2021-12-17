import { createRequestActionTypes } from '../middlewares/createRequestSaga.js';
import createAction from '../utils/createAction.js';

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('user/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('user/LOGIN');
const LOGOUT = 'user/LOGOUT';

const register = createAction(REGISTER, ({ user, password }) => ({
  user,
  password,
}));
const login = createAction(LOGIN, ({ user, password }) => ({ user, password }));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
      };
  }
};
