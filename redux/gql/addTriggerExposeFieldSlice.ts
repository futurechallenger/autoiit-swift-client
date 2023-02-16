import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addTriggerExposeField = createAsyncThunk(
  'addTriggerExposeField',
  async (variables: AddExposeFieldMutationVariables) => {
    return sendRequest<AddExposeFieldMutation>({
      variables,
      query: AddExposeFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  exposeField: undefined,
  status: undefined,
  error: undefined,
};

export const addTriggerExposeFieldSlice = createSlice({
  name: 'addTriggerExposeFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTriggerExposeField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addTriggerExposeField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.trigger = payload?.data?.addExposeField;
        }
      })
      .addCase(addTriggerExposeField.rejected, (state, action) => {
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

export type AddExposeFieldMutationVariables = Types.Exact<{
  f: Types.ExposeFieldInput;
}>;

export type AddExposeFieldMutation = {
  __typename?: 'Mutation';
  addExposeField?: Types.ExposeField | null;
};

export const AddExposeFieldDocument = `
    mutation addExposeField($f: ExposeFieldInput!) {
  addExposeField(exposeField: $f) {
    id
    keyName
    helperText
    label
    parserPath
    serviceTriggerId
  }
}`;
