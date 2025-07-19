import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./features/auth/rootReducer";

// persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
// HOST
export const server =
  "https://production-nodejs-ecommerce-app-0mv9.onrender.com/api/v1";
