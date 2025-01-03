import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const updateServiceTrigger = createAsyncThunk(
  "updateServiceTrigger",
  async (variables: UpdateTriggerMutationVariables) => {
    return sendRequest<UpdateTriggerMutation>({
      variables,
      query: UpdateTriggerDocument,
    });
  }
);

const initialState: InitialStateType = {
  trigger: undefined,
  status: undefined,
  error: undefined,
};

export const updateServiceTriggerSlice = createSlice({
  name: "updateServiceTriggerSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateServiceTrigger.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateServiceTrigger.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.trigger = payload?.data?.updateServiceTrigger;
        }
      })
      .addCase(updateServiceTrigger.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  trigger: Types.ServiceTrigger | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateTriggerMutationVariables = Types.Exact<{
  trigger: Types.ServiceTriggerInput;
}>;

export type UpdateTriggerMutation = {
  __typename?: "Mutation";
  updateServiceTrigger?: Types.ServiceTrigger;
};

export const UpdateTriggerDocument = `
    mutation updateTrigger($trigger: ServiceTriggerInput!) {
  updateServiceTrigger(serviceTriggerInput: $trigger) {
    id
    name
    description
    endpointPath
    endpointType
    serviceApiId
  }
}`;
