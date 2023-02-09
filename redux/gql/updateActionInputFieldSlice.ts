import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateActionInputField = createAsyncThunk(
  'updateActionInputField',
  async (variables: UpdateActionInputFieldMutationVariables) => {
    return sendRequest<UpdateActionInputFieldMutation>({
      variables,
      query: UpdateActionInputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionInputField: undefined,
  status: undefined,
  error: undefined,
};

export const updateActionInputFieldSlice = createSlice({
  name: 'updateActionInputFieldSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateActionInputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateActionInputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionInputField = payload?.data?.updateActionInputField;
        }
      })
      .addCase(updateActionInputField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionInputField: Types.ActionInputField | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateActionInputFieldMutationVariables = Types.Exact<{
  actionInputField: Types.ActionInputFieldInput;
}>;

export type UpdateActionInputFieldMutation = {
  __typename?: 'Mutation';
  updateActionInputField?: {
    __typename?: 'ActionInputField';
    id?: number | null;
    keyName?: string | null;
    helperText?: string | null;
    fieldType?: number | null;
    serviceApiActionId?: number | null;
  } | null;
};

export const UpdateActionInputFieldDocument = `
    mutation updateActionInputField($actionInputField: ActionInputFieldInput!) {
  updateActionInputField(actionInputField: $actionInputField) {
    id
    keyName
    helperText
    fieldType
    serviceApiActionId
  }
}`;
