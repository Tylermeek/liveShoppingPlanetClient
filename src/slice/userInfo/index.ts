import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "types/auth";

const initialState: {
  userInfo: IUserInfo | null;
  Token: string | null;
} = {
  userInfo: null,
  Token: null,
};

const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.Token = action.payload;
    },
  },
});

export const { setUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;
