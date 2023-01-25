import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const addServiceAuth = createAsyncThunk(
  "addServiceAuth",
  async (variables: AddServiceAuthMutationVariables) => {
    return sendRequest<AddServiceAuthMutation>({
      variables,
      query: AddServiceAuthDocument,
    });
  }
);

const initialState: InitialStateType = {
  serviceAuth: undefined,
  status: undefined,
  error: undefined,
};

export const addServiceAuthSlice = createSlice({
  name: "addServiceAuthSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addServiceAuth.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addServiceAuth.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.serviceAuth = payload?.data?.addServiceAuth;
        }
      })
      .addCase(addServiceAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceAuth: Types.ServiceAuth | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddServiceAuthMutationVariables = Types.Exact<{
  auth: Types.ServiceAuthInput;
}>;

export type AddServiceAuthMutation = {
  __typename?: "Mutation";
  addServiceAuth: {
    __typename?: "ServiceAuth";
    id?: number | null;
    providerName?: string | null;
    scope?: string | null;
    serviceId?: number | null;
  };
};

export const AddServiceAuthDocument = `
    mutation addServiceAuth($auth: ServiceAuthInput!) {
  addServiceAuth(service: $auth) {
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
