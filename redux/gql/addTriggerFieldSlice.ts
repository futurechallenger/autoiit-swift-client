import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const addTriggerField = createAsyncThunk(
  "addTriggerField",
  async (variables: AddTriggerFieldMutationVariables) => {
    return sendRequest<AddTriggerFieldMutation>({
      variables,
      query: AddTriggerFieldDocument,
    });
  }
);

const initialState: InitialStateType = {
  triggerField: undefined,
  status: undefined,
  error: undefined,
};

export const addTriggerFieldSlice = createSlice({
  name: "addTriggerFieldSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTriggerField.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addTriggerField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.triggerField = payload?.data?.addTriggerField;
        }
      })
      .addCase(addTriggerField.rejected, (state, action) => {
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

export type AddTriggerFieldMutationVariables = Types.Exact<{
  field: Types.TriggerFieldInput;
}>;

export type AddTriggerFieldMutation = {
  __typename?: "Mutation";
  addTriggerField?: Types.TriggerField | null;
};

export const AddTriggerFieldDocument = `
    mutation addTriggerField($field: TriggerFieldInput!) {
  addTriggerField(triggerField: $field) {
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
