import {
  PAYMENT_LOADING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
} from "./actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENT_LOADING":
      return { ...state, loading: true, error: null };

    case "PAYMENT_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "PAYMENT_FAILED":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default paymentReducer;
