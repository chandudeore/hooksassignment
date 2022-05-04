import { LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS, LOG_OUT } from "./action";

const intialState = {
  loading: false,
  error: false,
  isAuthenticated: false,
  token: "",
  username: "",
};

export const loginReducer = (store = intialState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...store, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...store,
        error: false,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        username: payload.username,
      };
    case LOGIN_FAILURE:
      return {
        ...store,
        error: true,
        loading: false,
        isAuthenticated: false,
        token: "",
        username: "",
      };
    case LOG_OUT:
      return { ...intialState };
    default:
      return store;
  }
};
