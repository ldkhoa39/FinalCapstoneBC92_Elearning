import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserLogin } from "../../type";

interface AuthState {
  userLogin: UserLogin | null;
}

const userLocal = localStorage.getItem("userLogin");

const initialState: AuthState = {
  userLogin: userLocal ? JSON.parse(userLocal) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserLogin>) => {
      state.userLogin = action.payload;
      localStorage.setItem("userLogin", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userLogin = null;
      localStorage.removeItem("userLogin");
    },
  },
});

export const { setUserLogin, logout } = authSlice.actions;
export default authSlice.reducer;