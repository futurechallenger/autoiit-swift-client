import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const removeActionInputField = createAsyncThunk(
  'removeActionInputField',
  async (variables: RemoveActionInputFieldMutationVariables) => {
    return sendRequest<RemoveActionInputFieldMutation>({
      variables,
      query: RemoveActionInputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionInputField: undefined,
  status: undefined,
  error: undefined,
};

export const removeActionInputFieldSlice = createSlice({
  name: 'removeActionInputFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(removeActionInputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(removeActionInputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionInputField = payload?.data?.removeActionInputField;
        }
      })
      .addCase(removeActionInputField.rejected, (state, action) => {
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

export type RemoveActionInputFieldMutationVariables = Types.Exact<{
  fieldId: Types.Scalars['Int'];
}>;

export type RemoveActionInputFieldMutation = {
  __typename?: 'Mutation';
  removeActionInputField?: {
    __typename?: 'ActionInputField';
    id?: number | null;
  } | null;
};

export const RemoveActionInputFieldDocument = `
    mutation removeActionInputField($fieldId: Int!) {
  removeActionInputField(actionInputFieldId: $fieldId) {
    id
  }
}`;

export const { resetStatus } = removeActionInputFieldSlice.actions;
