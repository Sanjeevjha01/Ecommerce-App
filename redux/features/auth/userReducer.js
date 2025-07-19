import {
  USER_LOADING,
  USER_LOADED,
  USER_ERROR,
  USER_LOGOUT,
  LOAD_USER_FROM_STORAGE,
  CLEAR_ERROR,
} from "./actionTypes";

const initialState = {
  isAuth: false,
  loading: false,
  user: null,
  token: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_USER_FROM_STORAGE:
      ({
        isAuth: true,
        loading: false,
        token: action.payload.token ? "Token present" : "No token",
        user: action.payload.user ? "User present" : "No user",
        error: null,
      });

      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case USER_LOADED:
      ({
        isAuth: true,
        loading: false,
        token: action.payload.token ? "Token present" : "No token",
        user: action.payload.user ? "User present" : "No user",
        error: null,
      });

      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case USER_ERROR:
      ({
        isAuth: false,
        loading: false,
        token: "No token",
        user: "No user",
        error: action.payload,
      });

      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case USER_LOGOUT:
      ({
        isAuth: false,
        loading: false,
        token: "No token",
        user: "No user",
        error: null,
      });

      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
        token: null,
        error: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
