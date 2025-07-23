import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productsSlice from "./products/productsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./user/userSlice";
const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "accessToken"],
};
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    products: productsSlice.reducer,
    user: persistReducer(userConfig, userSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ❗ KHÔNG khuyến khích cho production
    }),
});
export const persistor = persistStore(store);
