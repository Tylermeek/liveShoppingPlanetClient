import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counter/counterSlice";
import cartReducer from "../slice/cart/cartSlice";
import orderReducer from "../slice/order";
import userReducer from "../slice/userInfo";
import catalogReducer from "../slice/catalog";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  counter: counterReducer,
  cartInfo: cartReducer,
  order: orderReducer,
  user: userReducer,
  catalog: catalogReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
