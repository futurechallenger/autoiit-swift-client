import { updateServiceApiSlice } from './gql/updateServiceApiSlice';
import { addServiceApiSlice } from './gql/addServiceApiSlice';
import { updateServiceSlice } from './gql/updateServiceSlice';
import { getServicesByUserIdSlice } from './gql/servicesByUserIdSlice';
import { addServiceSlice } from './gql/addServiceSlice';
import { getServiceFullInfoSlice } from './gql/serviceFullInfo';
import { getTriggersSlice } from './gql/triggersSlice';
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
import { getServiceApisSlice } from './gql/getServiceApisSlice';

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
    serviceTriggers: getTriggersSlice.reducer,
    serviceFullInfo: getServiceFullInfoSlice.reducer,
    addService: addServiceSlice.reducer,
    userServices: getServicesByUserIdSlice.reducer,
    updateService: updateServiceSlice.reducer,
    serviceApis: getServiceApisSlice.reducer,
    addServiceApi: addServiceApiSlice.reducer,
    updateServiceApi: updateServiceApiSlice.reducer
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
