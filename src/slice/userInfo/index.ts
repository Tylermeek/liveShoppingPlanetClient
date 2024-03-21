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
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.Token = action.payload;
    },
    clear: (state) => {
      state.Token = null;
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, setToken,clear } = userSlice.actions;
export default userSlice.reducer;
