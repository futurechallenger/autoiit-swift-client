import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const updateServiceApi = createAsyncThunk(
  "createServiceApi",
  async (variables: UpdateServiceApiMutationVariables) => {
    return sendRequest<UpdateServiceApiMutation>({
      variables,
      query: UpdateServiceApiDocument,
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
      .addCase(updateServiceApi.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateServiceApi.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.serviceApi = payload?.data?.updateServiceApi;
        }
      })
      .addCase(updateServiceApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceApi: Types.ServiceApi | undefined | null;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateServiceApiMutationVariables = Types.Exact<{
  serviceApi: Types.ServiceApiInput;
}>;

export type UpdateServiceApiMutation = {
  __typename?: "Mutation";
  updateServiceApi?: /*{
    __typename?: "ServiceAPI";
    id?: number | null;
    name?: string | null;
    serviceId?: number | null;
    servicePath?: string | null;
    description?: string | null;
  } | null;*/

  Types.ServiceApi | undefined | null;
};

export const UpdateServiceApiDocument = `
    mutation updateServiceApi($serviceApi: ServiceAPIInput!) {
  updateServiceApi(serviceApi: $serviceApi) {
    id
    name
    serviceId
    servicePath
    description
  }
}
    `;
