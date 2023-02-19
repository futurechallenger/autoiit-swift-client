import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getAuthByService = createAsyncThunk(
  'getAuthByService',
  async (variables: GetAuthByServiceQueryVariables) => {
    return sendRequest<GetAuthByServiceQuery>({
      variables,
      query: GetAuthByServiceDocument,
    });
  },
);

const initialState: InitialStateType = {
  serviceAuth: undefined,
  status: undefined,
  error: undefined,
};

export const getAuthByServiceSlice = createSlice({
  name: 'getAuthByServiceSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthByService.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getAuthByService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.serviceAuth = payload?.data?.serviceAuthsBy;
        }
      })
      .addCase(getAuthByService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceAuth: Types.ServiceAuth | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetAuthByServiceQueryVariables = Types.Exact<{
  serviceId: Types.Scalars['Int'];
}>;

export type GetAuthByServiceQuery = {
  __typename?: 'Query';
  // serviceAuthsBy: Array<{
  //   __typename?: 'ServiceAuth';
  //   id?: number | null;
  //   providerName?: string | null;
  //   authorizationUrl?: string | null;
  //   clientId?: string | null;
  //   clientSecret?: string | null;
  //   tokenUrl?: string | null;
  //   redirectUrl?: string | null;
  //   accessToken?: string | null;
  //   tokenSecret?: string | null;
  //   accessTokenTtl?: number | null;
  //   refreshToken?: string | null;
  //   refreshTokenTtl?: number | null;
  //   scope?: string | null;
  //   demoAccountLogin?: string | null;
  //   demoAccountPassword?: string | null;
  //   demoAccountNotes?: string | null;
  //   serviceId?: number | null;
  // }>;
  serviceAuthsBy?: Types.ServiceAuth | null;
};

export const GetAuthByServiceDocument = `
    query getAuthByService($serviceId: Int!) {
  serviceAuthsBy(serviceId: $serviceId) {
    id
    providerName
    authorizationUrl
    clientId
    clientSecret
    tokenUrl
    redirectUrl
    accessToken
    tokenSecret
    accessTokenTtl
    refreshToken
    refreshTokenTtl
    scope
    demoAccountLogin
    demoAccountPassword
    demoAccountNotes
    serviceId
  }
}`;
