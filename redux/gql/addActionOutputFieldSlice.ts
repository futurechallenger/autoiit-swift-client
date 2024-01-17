import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addActionOutputField = createAsyncThunk(
  'addActionInputField',
  async (variables: AddActionOutputFieldMutationVariables) => {
    return sendRequest<AddActionOutputFieldMutation>({
      variables,
      query: AddActionOutputFieldDocument,
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
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addActionOutputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addActionOutputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionInputField = payload?.data?.addActionInputField;
        }
      })
      .addCase(addActionOutputField.rejected, (state, action) => {
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

export type AddActionOutputFieldMutationVariables = Types.Exact<{
  actionOutputField: Types.ActionOutputFieldInput;
}>;


export type AddActionOutputFieldMutation = { __typename?: 'Mutation', addActionOutputField?: { __typename?: 'ActionOutputField', id?: number | null, keyName?: string | null, label?: string | null, helperText?: string | null, fieldType?: number | null, fieldSourceApi?: string | null, serviceApiActionId?: number | null } | null };


export const AddActionOutputFieldDocument = `
    mutation addActionOutputField($actionOutputField: ActionOutputFieldInput!) {
  addActionOutputField(actionOutputField: $actionOutputField) {
    id
    keyName
    label
    helperText
    fieldType
    fieldSourceApi
    serviceApiActionId
  }
}
    `;

export const { resetStatus } = addActionInputFieldSlice.actions;
