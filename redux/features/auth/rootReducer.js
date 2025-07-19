import { combineReducers } from "redux";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
// import paymentReducer from "./paymentReducer";
import { addToCartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cart: addToCartReducer,
  // payment: paymentReducer,
});

export default rootReducer;
