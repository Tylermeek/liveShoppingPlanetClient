import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counter/counterSlice";
import cartReducer from "../slice/cart/cartSlice";
import orderReducer from "../slice/order";
import userReducer from "../slice/userInfo";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cartInfo: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
