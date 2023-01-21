import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const addServiceApi = createAsyncThunk(
  "createServiceApi",
  async (variables: AddServiceApiMutationVariables) => {
    return sendRequest<AddServiceApiMutation>({
      variables,
      query: AddServiceApiDocument,
    });
  }
);

const initialState: InitialStateType = {
  serviceApi: undefined,
  status: undefined,
  error: undefined,
};

export const addServiceApiSlice = createSlice({
  name: "addServiceApiSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addServiceApi.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addServiceApi.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.serviceApi = payload?.data?.addServiceApi;
        }
      })
      .addCase(addServiceApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceApi: Types.ServiceApi | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddServiceApiMutationVariables = Types.Exact<{
  apiInput: Types.ServiceApiInput;
}>;

export type AddServiceApiMutation = {
  __typename?: "Mutation";
  // addServiceApi: {
  //   __typename?: "ServiceAPI";
  //   id?: number | null;
  //   name?: string | null;
  //   serviceId?: number | null;
  //   servicePath?: string | null;

  //   url?: String | null;
  //   description?: String | null;
  //   category?: number | null;
  //   supportMail?: String | null;
  //   inviteUrl?: String | null;
  // };
  addServiceApi: Types.ServiceApi;
};

export const AddServiceApiDocument = `
    mutation addServiceApi($apiInput: ServiceAPIInput!) {
  addServiceApi(serviceApi: $apiInput) {
    id
    name
    serviceId
    servicePath
  }
}
    `;
