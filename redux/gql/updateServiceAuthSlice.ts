import { ServiceAuth } from "./../types.generated";
import { types } from "@babel/core";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const updateServiceAuth = createAsyncThunk(
  "addServiceAuth",
  async (variables: UpdateServiceAuthMutationVariables) => {
    return sendRequest<UpdateServiceAuthMutation>({
      variables,
      query: UpdateServiceAuthDocument,
    });
  }
);

const initialState: InitialStateType = {
  serviceAuth: undefined,
  status: undefined,
  error: undefined,
};

export const updateServiceAuthSlice = createSlice({
  name: "addServiceAuthSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateServiceAuth.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateServiceAuth.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.serviceAuth = payload?.data?.updateServiceAuth;
        }
      })
      .addCase(updateServiceAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceAuth: Types.ServiceAuth | undefined | null;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateServiceAuthMutationVariables = Types.Exact<{
  auth: Types.ServiceAuthInput;
}>;

export type UpdateServiceAuthMutation = {
  __typename?: "Mutation";
  updateServiceAuth?: Types.ServiceAuth | null;
};

export const UpdateServiceAuthDocument = `
    mutation updateServiceAuth($auth: ServiceAuthInput!) {
  updateServiceAuth(service: $auth) {
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
  }
}`;
