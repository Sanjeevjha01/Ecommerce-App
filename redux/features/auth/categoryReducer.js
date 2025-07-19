import {
  CATEGORY_LOADING,
  CATEGORY_LOADED,
  CATEGORY_ERROR,
} from "./actionTypes";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY_SUCCESS":
      return { ...state, loading: true, error: null };

    case "CATEGORY_LOADED":
      return { ...state, loading: false, categories: action.payload };

    case "CATEGORY_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
