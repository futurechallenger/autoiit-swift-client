import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const getTriggersByServiceId = createAsyncThunk(
  "getTriggersByServiceId",
  async (variables: TriggersByServiceQueryVariables) => {
    return sendRequest<TriggersByServiceQuery>({
      query: TriggersByServiceDocument,
      variables,
    });
  }
);

const initialState: InitialStateType = {
  triggers: [],
  error: undefined,
  status: "",
};

export const getTriggersSlice = createSlice({
  name: "getTriggersSlice ",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTriggersByServiceId.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getTriggersByServiceId.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.triggers = payload?.data?.triggers ?? [];
        }
      })
      .addCase(getTriggersByServiceId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export type TriggersByServiceQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

interface InitialStateType {
  triggers: Array<any>;
  error: string | undefined;
  status: string;
}

export type TriggersByServiceQuery = {
  __typename?: "Query";
  triggers?: Array<{
    __typename?: "ServiceTrigger";
    name?: string | null;
    description?: string | null;
  }> | null;
};

export const TriggersByServiceDocument = `
    query triggersByService($serviceId: Int!) {
      triggers(serviceId: $serviceId) {
        name
        description
      }
  }`;
