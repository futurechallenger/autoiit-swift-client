import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addActionOutputField = createAsyncThunk(
  'addActionOutputField',
  async (variables: AddActionOutputFieldMutationVariables) => {
    return sendRequest<AddActionOutputFieldMutation>({
      variables,
      query: AddActionOutputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionOutputField: undefined,
  status: undefined,
  error: undefined,
};

export const addActionOutputFieldSlice = createSlice({
  name: 'addActionOutputFieldSlice',
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
          state.actionOutputField = payload?.data?.addActionOutputField;
        }
      })
      .addCase(addActionOutputField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionOutputField: Types.ActionOutputField | undefined | null;
  status: string | undefined;
  error: string | undefined;
}

export type AddActionOutputFieldMutationVariables = Types.Exact<{
  actionOutputField: Types.ActionOutputFieldInput;
}>;

export type AddActionOutputFieldMutation = {
  __typename?: 'Mutation';
  addActionOutputField?: {
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

export const { resetStatus } = addActionOutputFieldSlice.actions;
