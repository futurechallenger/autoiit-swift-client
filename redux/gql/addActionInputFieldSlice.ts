import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addActionInputField = createAsyncThunk(
  'addActionInputField',
  async (variables: AddActionInputFieldMutationVariables) => {
    return sendRequest<AddActionInputFieldMutation>({
      variables,
      query: AddActionInputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionInputField: undefined,
  status: undefined,
  error: undefined,
};

export const addActionInputFieldSlice = createSlice({
  name: 'addActionInputFieldSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addActionInputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addActionInputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionInputField = payload?.data?.addActionInputField;
        }
      })
      .addCase(addActionInputField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionInputField: Types.ActionInputField | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddActionInputFieldMutationVariables = Types.Exact<{
  f: Types.ActionInputFieldInput;
}>;

export type AddActionInputFieldMutation = {
  __typename?: 'Mutation';
  // addActionInputField?: {
  //   __typename?: 'ActionInputField';
  //   id?: number | null;
  //   keyName?: string | null;
  //   label?: string | null;
  //   helperText?: string | null;
  //   fieldType?: number | null;
  //   serviceApiActionId?: number | null;
  // } | null;
  addActionInputField?: Types.ActionInputField | null;
};

export const AddActionInputFieldDocument = `
    mutation addActionInputField($f: ActionInputFieldInput!) {
  addActionInputField(actionInputField: $f) {
    id
    keyName
    label
    helperText
    fieldType
    serviceApiActionId
  }
}`;
