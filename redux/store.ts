import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./gql/loginService";
import { serviceInfoSlice } from "./gql/serviceInfoService";
import { signInSlice } from "./gql/signInService";
import { userInfoSlice } from "./gql/userInfoService";

export const store = configureStore({
  reducer: combineReducers({
    login: loginSlice.reducer,
    serviceInfo: serviceInfoSlice.reducer,
    signIn: signInSlice.reducer,
    userInfo: userInfoSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
