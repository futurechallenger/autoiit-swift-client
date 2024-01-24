import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addTriggerExposeField = createAsyncThunk(
  'addTriggerExposeField',
  async (variables: AddTriggerExposeFieldMutationVariables) => {
    return sendRequest<AddTriggerExposeFieldMutation>({
      variables,
      query: AddTriggerExposeFieldDocument,
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
      state.error = undefined;
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
          state.exposeField = payload?.data?.addExposeField;
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

export type AddTriggerExposeFieldMutationVariables = Types.Exact<{
  triggerExposeField: Types.ExposeFieldInput;
}>;

export type AddTriggerExposeFieldMutation = {
  __typename?: 'Mutation';
  addExposeField?: {
    __typename?: 'ExposeField';
    id?: number | null;
    label?: string | null;
    keyName?: string | null;
    helperText?: string | null;
    example?: string | null;
    fieldType?: number | null;
    serviceTriggerId?: number | null;
  } | null;
};

export const AddTriggerExposeFieldDocument = `
    mutation addTriggerExposeField($triggerExposeField: ExposeFieldInput!) {
  addExposeField(exposeField: $triggerExposeField) {
    id
    label
    keyName
    helperText
    example
    fieldType
    serviceTriggerId
  }
}
    `;

export const { resetStatus } = addTriggerExposeFieldSlice.actions;
