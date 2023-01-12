import { chooseServiceSlice } from './gql/chooseServices';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./gql/loginService";
import {
  searchServiceSlice,
  mostSearchedServicesSlice,
} from "./gql/searchService";
import { serviceInfoSlice } from "./gql/serviceInfoService";
import { signInSlice } from "./gql/signInService";
import { userInfoSlice } from "./gql/userInfoService";
import { getServiceByIdSlice } from "./gql/serviceById";

export const store = configureStore({
  reducer: combineReducers({
    login: loginSlice.reducer,
    serviceInfo: serviceInfoSlice.reducer,
    signIn: signInSlice.reducer,
    userInfo: userInfoSlice.reducer,
    exploreServices: searchServiceSlice.reducer,
    mostSearchedServices: mostSearchedServicesSlice.reducer,
    serviceById: getServiceByIdSlice.reducer,
    chooseService: chooseServiceSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
