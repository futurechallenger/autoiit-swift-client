import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const getServiceTriggers = createAsyncThunk(
  "getServiceTriggers",
  async (variables: GetTriggersQueryVariables) => {
    return sendRequest<GetTriggersQuery>({
      variables,
      query: GetTriggersDocument,
    });
  }
);

const initialState: InitialStateType = {
  triggers: undefined,
  status: undefined,
  error: undefined,
};

export const getServiceTriggerSlice = createSlice({
  name: "getServiceTriggerSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceTriggers.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceTriggers.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.triggers = payload?.data?.triggers ?? [];
        }
      })
      .addCase(getServiceTriggers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  triggers: Types.ServiceTrigger[] | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetTriggersQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export type GetTriggersQuery = {
  __typename?: "Query";
  triggers?: Array<{
    __typename?: "ServiceTrigger";
    id?: number | null;
    name?: string | null;
    description?: string | null;
    endpointPath: string;
    endpointType?: number | null;
    serviceApiId?: number | null;
  }> | null;
};

export const GetTriggersDocument = `
    query getTriggers($serviceId: Int!) {
  triggers(serviceId: $serviceId) {
    id
    name
    description
    endpointPath
    endpointType
    serviceApiId
  }
}`;
