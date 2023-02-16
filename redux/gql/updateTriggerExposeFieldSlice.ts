import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateTriggerExposeField = createAsyncThunk(
  'updateTriggerExposeField',
  async (variables: UpdateExposeFieldMutationVariables) => {
    return sendRequest<UpdateExposeFieldMutation>({
      variables,
      query: UpdateExposeFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  exposeField: undefined,
  status: undefined,
  error: undefined,
};

export const updateTriggerExposeFieldSlice = createSlice({
  name: 'updateTriggerExposeFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateTriggerExposeField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateTriggerExposeField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.exposeField = payload?.data?.updateExposeField;
        }
      })
      .addCase(updateTriggerExposeField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  exposeField: Types.ExposeField | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateExposeFieldMutationVariables = Types.Exact<{
  f: Types.ExposeFieldInput;
}>;

export type UpdateExposeFieldMutation = {
  __typename?: 'Mutation';
  updateExposeField?: Types.ExposeField | null;
};

export const UpdateExposeFieldDocument = `
    mutation updateExposeField($f: ExposeFieldInput!) {
  updateExposeField(exposeField: $f) {
    id
    keyName
    helperText
    label
    parserPath
    serviceTriggerId
  }
}`;
