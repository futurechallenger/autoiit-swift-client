import { getCurrentUserInfoSlice } from './gql/getCurrentUserInfoSlice';
import { removeFieldMappingItemSlice } from './gql/removeFieldMappingItemSlice';
import { getFieldMappingItemsByFieldIdSlice } from './gql/getFieldMappingItemsByFieldIdSlice';
import { updateFieldMappingItemSlice } from './gql/updateFieldMappingItemSlice';
import { getFieldMappingItemsSlice } from './gql/getFieldMappingItemsSlice';
import { addFieldMappingItemsSlice } from './gql/addFieldMappingItemsSlice';
import { getServiceTriggerSlice } from './gql/getTriggersSlice';
import { updateServiceAuthSlice } from './gql/updateServiceAuthSlice';
import { getServiceAuthSlice } from './gql/getServiceAuthBySlice';
import { updateServiceApiSlice } from './gql/updateServiceApiSlice';
import { addServiceApiSlice } from './gql/addServiceApiSlice';
import { updateServiceSlice } from './gql/updateServiceSlice';
import { getServicesByUserIdSlice } from './gql/servicesByUserIdSlice';
import { addServiceSlice } from './gql/addServiceSlice';
import { getServiceFullInfoSlice } from './gql/serviceFullInfo';
import { getServicesSlice } from './gql/chooseServices';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { loginSlice } from './gql/loginService';
import { searchServiceSlice, mostSearchedServicesSlice } from './gql/searchService';
import { serviceInfoSlice } from './gql/serviceInfoService';
import { signInSlice } from './gql/signInService';
import { userInfoSlice } from './gql/userInfoService';
import { getServiceByIdSlice } from './gql/serviceById';
import { getServiceApisSlice } from './gql/getServiceApisSlice';
import { addServiceAuthSlice } from './gql/addServiceAuthSlice';
import { addServiceTriggerSlice } from './gql/addTriggerSlice';
import { getTriggerFieldsSlice } from './gql/getTriggerFieldsSlice';
import { addTriggerFieldSlice } from './gql/addTriggerFieldSlice';
import { updateTriggerFieldSlice } from './gql/updateTriggerFieldSlice';
import { deleteTriggerFieldSlice } from './gql/removeTriggerFieldSlice';
import { deleteTriggerSlice } from './gql/removeTriggerSlice';
import { getServiceActionsSlice } from './gql/getActionsSlice';
import { updateServiceActionSlice } from './gql/updateActionSlice';
import { deleteServiceActionSlice } from './gql/removeActionSlice';
import { getActionOutputFieldSlice } from './gql/getActionOutputFieldSlice';
import { addActionOutputFieldSlice } from './gql/addActionOutputFieldSlice';
import { getActionOutputFieldListSlice } from './gql/getActionOutputFieldListSlice';
import { removeActionInputFieldSlice } from './gql/removeActionInputFieldSlice';
import { getAutoFlowsByServiceSlice } from './gql/getAutoFlowsSlice';
import { addTriggerExposeFieldSlice } from './gql/addTriggerExposeFieldSlice';
import { updateTriggerExposeFieldSlice } from './gql/updateTriggerExposeFieldSlice';
import { getTriggerExposeFieldsSlice } from './gql/getTriggerExposeFieldsSlice';
import { removeTriggerExposeFieldSlice } from './gql/removeTriggerExpopseFieldSlice';
import { getFieldOptionsSlice } from './gql/getFieldOptionsSlice';
import { addFieldOptionsSlice } from './gql/addFieldOptionsSlice';
import { updateFieldOptionSlice } from './gql/updateFieldOptionSlice';
import { AddAutoFlowSlice } from './gql/addAutoFlowSlice';
import { updateAutoFlowSlice } from './gql/updateAutoFlowSlice';
import { getAutoFlowByIdSlice } from './gql/getAutoFlowByIdSlice';
import { getServiceTriggerByIdSlice } from './gql/getTriggerByIdSlice';
import { getConnectionStatusSlice } from './gql/getConnectionStatusSlice';
import { updateActionOutputFieldSlice } from './gql/updateActionOutputFieldSlice';
import { addActionMappingFieldSlice } from './gql/addActionMappingFieldSlice';

export const store = configureStore({
  reducer: combineReducers({
    login: loginSlice.reducer,
    serviceInfo: serviceInfoSlice.reducer,
    signIn: signInSlice.reducer,
    userInfo: userInfoSlice.reducer,
    exploreServices: searchServiceSlice.reducer,
    actionOutputFieldList: getActionOutputFieldListSlice.reducer,
    mostSearchedServices: mostSearchedServicesSlice.reducer,
    serviceById: getServiceByIdSlice.reducer,
    services: getServicesSlice.reducer,
    serviceFullInfo: getServiceFullInfoSlice.reducer,
    addService: addServiceSlice.reducer,
    userServices: getServicesByUserIdSlice.reducer,
    updateService: updateServiceSlice.reducer,
    serviceApis: getServiceApisSlice.reducer,
    addServiceApi: addServiceApiSlice.reducer,
    updateServiceApi: updateServiceApiSlice.reducer,
    addServiceAuth: addServiceAuthSlice.reducer,
    getServiceAuth: getServiceAuthSlice.reducer,
    updateServiceAuth: updateServiceAuthSlice.reducer,
    serviceTriggers: getServiceTriggerSlice.reducer,
    serviceTriggerById: getServiceTriggerByIdSlice.reducer,
    addTrigger: addServiceTriggerSlice.reducer,
    triggerFields: getTriggerFieldsSlice.reducer,
    addTriggerField: addTriggerFieldSlice.reducer,
    updateTriggerField: updateTriggerFieldSlice.reducer,
    removeTriggerField: deleteTriggerFieldSlice.reducer,
    deleteTrigger: deleteTriggerSlice.reducer,
    serviceActions: getServiceActionsSlice.reducer,
    addServiceAction: addServiceApiSlice.reducer,
    updateServiceAction: updateServiceActionSlice.reducer,
    removeServiceAction: deleteServiceActionSlice.reducer,
    ActionOutputField: getActionOutputFieldSlice.reducer,
    addActionOutputField: addActionOutputFieldSlice.reducer,
    removeActionInputField: removeActionInputFieldSlice.reducer,
    autoFlowsByService: getAutoFlowsByServiceSlice.reducer,
    addExposeField: addTriggerExposeFieldSlice.reducer,
    updateExposeField: updateTriggerExposeFieldSlice.reducer,
    exposeFields: getTriggerExposeFieldsSlice.reducer,
    removeExposeField: removeTriggerExposeFieldSlice.reducer,
    fieldOptions: getFieldOptionsSlice.reducer,
    addFieldOptions: addFieldOptionsSlice.reducer,
    updateFieldOption: updateFieldOptionSlice.reducer,
    addAutoFlow: AddAutoFlowSlice.reducer,
    updateAutoFlow: updateAutoFlowSlice.reducer,
    autoFlowById: getAutoFlowByIdSlice.reducer,
    addFieldMappingItems: addFieldMappingItemsSlice.reducer,
    fieldMappingItems: getFieldMappingItemsSlice.reducer,
    fieldMappingItemsByFieldId: getFieldMappingItemsByFieldIdSlice.reducer,
    updateFieldMappingItem: updateFieldMappingItemSlice.reducer,
    removeFieldMappingItem: removeFieldMappingItemSlice.reducer,
    currentUserInfo: getCurrentUserInfoSlice.reducer,
    connectionStatus: getConnectionStatusSlice.reducer,
    updateActionOutputField: updateActionOutputFieldSlice.reducer,
    addActionMappingField: addActionMappingFieldSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
