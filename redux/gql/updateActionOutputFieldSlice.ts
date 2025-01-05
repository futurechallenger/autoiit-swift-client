import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateActionOutputField = createAsyncThunk(
  'updateActionOutputField',
  async (variables: UpdateActionOutputFieldMutationVariables) => {
    return sendRequest<UpdateActionOutputFieldMutation>({
      variables,
      query: UpdateActionOutputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionOutputField: undefined,
  status: undefined,
  error: undefined,
};

export const updateActionOutputFieldSlice = createSlice({
  name: 'updateActionOutputFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateActionOutputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateActionOutputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionOutputField = payload?.data?.updateActionOutputField;
        }
      })
      .addCase(updateActionOutputField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionOutputField: Types.ActionOutputField | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateActionOutputFieldMutationVariables = Types.Exact<{
  actionOutputField: Types.ActionOutputFieldInput;
}>;

export type UpdateActionOutputFieldMutation = {
  __typename?: 'Mutation';
  updateActionOutputField?: {
    __typename?: 'ActionOutputField';
    id?: number | null;
    keyName?: string | null;
    label?: string | null;
    helperText?: string | null;
    fieldType?: number | null;
    fieldSourceApi?: string | null;
    serviceApiActionId?: number | null;
  } | null;
};

export const UpdateActionOutputFieldDocument = `
    mutation updateActionOutputField($actionOutputField: ActionOutputFieldInput!) {
  updateActionOutputField(actionOutputField: $actionOutputField) {
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

export const { resetStatus: resetUpdateActionOutputFieldStatus } = updateActionOutputFieldSlice.actions;
