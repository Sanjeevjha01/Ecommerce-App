import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART } from "./actionTypes";

const initialState = [];

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item
        );
      } else {
        return [...state, action.payload];
      }

    case REMOVE_FROM_CART:
      return state.filter((item) => item && item.id !== action.payload);

    case "UPDATE_CART_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
