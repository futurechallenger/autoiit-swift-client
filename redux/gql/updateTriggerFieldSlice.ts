import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const updateTriggerField = createAsyncThunk(
  "updateTriggerField",
  async (variables: EditTriggerFieldMutationVariables) => {
    return sendRequest<EditTriggerFieldMutation>({
      variables,
      query: EditTriggerFieldDocument,
    });
  }
);

const initialState: InitialStateType = {
  triggerField: undefined,
  status: undefined,
  error: undefined,
};

export const updateTriggerFieldSlice = createSlice({
  name: "updateTriggerFieldSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateTriggerField.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateTriggerField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.triggerField = payload?.data?.updateTriggerField;
        }
      })
      .addCase(updateTriggerField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  triggerField: Types.TriggerField | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type EditTriggerFieldMutationVariables = Types.Exact<{
  field: Types.TriggerFieldInput;
}>;

export type EditTriggerFieldMutation = {
  __typename?: "Mutation";
  updateTriggerField?: Types.TriggerField | null;
};

export const EditTriggerFieldDocument = `
    mutation editTriggerField($field: TriggerFieldInput!) {
  updateTriggerField(triggerField: $field) {
    id
    keyName
    label
    helperText
    inputType
    validationRule
    validationRequired
    serviceTriggerId
  }
}`;
