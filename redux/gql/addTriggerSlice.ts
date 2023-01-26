import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const addServiceTrigger = createAsyncThunk(
  "addServiceTrigger",
  async (variables: AddTriggerMutationVariables) => {
    return sendRequest<AddTriggerMutation>({
      variables,
      query: AddTriggerDocument,
    });
  }
);

const initialState: InitialStateType = {
  trigger: undefined,
  status: undefined,
  error: undefined,
};

export const addServiceTriggerSlice = createSlice({
  name: "addServiceTriggerSlice",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addServiceTrigger.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addServiceTrigger.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.trigger = payload?.data?.addServiceTrigger;
        }
      })
      .addCase(addServiceTrigger.rejected, (state, action) => {
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

export type AddTriggerMutationVariables = Types.Exact<{
  serviceTrigger: Types.ServiceTriggerInput;
}>;

export type AddTriggerMutation = {
  __typename?: "Mutation";
  addServiceTrigger?: Types.ServiceTrigger | null;
};

export const AddTriggerDocument = `
    mutation addTrigger($serviceTrigger: ServiceTriggerInput!) {
  addServiceTrigger(serviceTrigger: $serviceTrigger) {
    id
    name
    description
    endpointPath
    endpointType
    serviceApiId
  }
}`;

export const { resetStatus } = addServiceTriggerSlice.actions;
