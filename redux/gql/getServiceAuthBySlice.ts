import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getServiceAuth = createAsyncThunk(
  'getServiceAuth',
  async (variables: GetServiceAuthsByQueryVariables) => {
    return sendRequest<GetServiceAuthsByQuery>({
      variables,
      query: GetServiceAuthsByDocument,
    });
  },
);

const initialState: InitialStateType = {
  serviceAuth: undefined,
  status: undefined,
  error: undefined,
};

export const getServiceAuthSlice = createSlice({
  name: 'getServiceAuthSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceAuth.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceAuth.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.serviceAuth = payload?.data?.serviceAuthsBy?.[0] ?? {};
        }
      })
      .addCase(getServiceAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceAuth: Types.ServiceAuth;
  status: string | undefined;
  error: string | undefined;
}

export type GetServiceAuthsByQueryVariables = Types.Exact<{
  serviceId: Types.Scalars['Int'];
}>;

export type GetServiceAuthsByQuery = {
  __typename?: 'Query';
  serviceAuthsBy: Array<Types.ServiceAuth>;
};

export const GetServiceAuthsByDocument = `
    query getServiceAuthsBy($serviceId: Int!) {
  serviceAuthsBy(serviceId: $serviceId) {
    accessToken
    accessTokenTtl
    authorizationUrl
    clientId
    clientSecret
    demoAccountLogin
    demoAccountNotes
    demoAccountPassword
    id
    providerName
    redirectUrl
    refreshToken
    refreshTokenTtl
    scope
    serviceId
    tokenSecret
    tokenUrl
    category
  }
}`;
