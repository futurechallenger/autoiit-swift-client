import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const getServiceApis = createAsyncThunk(
  "getServiceApi",
  async (variables: GetServiceApisQueryVariables) => {
    return sendRequest<GetServiceApisQuery>({
      variables,
      query: GetServiceApisDocument,
    });
  }
);

const initialState: InitialStateType = {
  serviceApis: [],
  status: undefined,
  error: undefined,
};

export const getServiceApisSlice = createSlice({
  name: "getServiceApiSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceApis.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceApis.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.serviceApis = payload?.data?.serviceApis;
        }
      })
      .addCase(getServiceApis.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceApis: Types.ServiceApi[];
  status: string | undefined;
  error: string | undefined;
}

export type GetServiceApisQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export type GetServiceApisQuery = {
  __typename?: "Query";
  serviceApis: Array<{
    __typename?: "ServiceAPI";
    id?: number | null;
    serviceId?: number | null;
    name?: string | null;
    description?: string | null;
    url?: string | null;
    category?: number | null;
    supportMail?: string | null;
    servicePath?: string | null;
    inviteUrl?: string | null;
  }>;
};

export const GetServiceApisDocument = `
    query getServiceApis($serviceId: Int!) {
  serviceApis(serviceId: $serviceId) {
    id
    name
    description
    url
    category
    supportMail
    servicePath
    inviteUrl
    serviceId
  }
}`;
