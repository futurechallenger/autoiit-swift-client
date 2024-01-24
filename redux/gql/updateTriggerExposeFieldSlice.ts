import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateTriggerExposeField = createAsyncThunk(
  'updateTriggerExposeField',
  async (variables: UpdateTriggerExposeFieldMutationVariables) => {
    return sendRequest<UpdateTriggerExposeFieldMutation>({
      variables,
      query: UpdateTriggerExposeFieldDocument,
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

export type UpdateTriggerExposeFieldMutationVariables = Types.Exact<{
  triggerExposeField: Types.ExposeFieldInput;
}>;

export type UpdateTriggerExposeFieldMutation = {
  __typename?: 'Mutation';
  updateExposeField?: {
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

export const UpdateTriggerExposeFieldDocument = `
    mutation updateTriggerExposeField($triggerExposeField: ExposeFieldInput!) {
  updateExposeField(exposeField: $triggerExposeField) {
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

export const { resetStatus: resetUpdateExposeFieldStatus } = updateTriggerExposeFieldSlice.actions;
