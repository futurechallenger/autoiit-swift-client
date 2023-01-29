import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const deleteTrigger = createAsyncThunk(
  "deleteTrigger",
  async (variables: DeleteTriggerMutationVariables) => {
    return sendRequest<DeleteTriggerMutation>({
      variables,
      query: DeleteTriggerDocument,
    });
  }
);

const initialState: InitialStateType = {
  deleted: undefined,
  status: undefined,
  error: undefined,
};

export const deleteTriggerSlice = createSlice({
  name: "deleteTriggerSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteTrigger.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(deleteTrigger.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.deleted = payload?.data?.removeServiceTrigger;
        }
      })
      .addCase(deleteTrigger.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  deleted: boolean | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type DeleteTriggerMutationVariables = Types.Exact<{
  triggerId: Types.Scalars["Int"];
}>;

export type DeleteTriggerMutation = {
  __typename?: "Mutation";
  removeServiceTrigger: boolean;
};

export const DeleteTriggerDocument = `
    mutation deleteTrigger($triggerId: Int!) {
  removeServiceTrigger(triggerId: $triggerId)
}`;
