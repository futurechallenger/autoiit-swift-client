import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const removeTriggerExposeField = createAsyncThunk(
  'removeTriggerExposeField',
  async (variables: RemoveExposeFieldMutationVariables) => {
    return sendRequest<RemoveExposeFieldMutation>({
      variables,
      query: RemoveExposeFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  exposeField: undefined,
  status: undefined,
  error: undefined,
};

export const removeTriggerExposeFieldSlice = createSlice({
  name: 'removeTriggerExposeFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(removeTriggerExposeField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(removeTriggerExposeField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.exposeField = payload?.data?.removeExposeField;
        }
      })
      .addCase(removeTriggerExposeField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  exposeField: Types.ExposeField | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type RemoveExposeFieldMutationVariables = Types.Exact<{
  fieldId: Types.Scalars['Int'];
}>;

export type RemoveExposeFieldMutation = {
  __typename?: 'Mutation';
  removeExposeField?: Types.ExposeField | null;
};

export const RemoveExposeFieldDocument = `
    mutation removeExposeField($fieldId: Int!) {
  removeExposeField(fieldId: $fieldId) {
    id
  }
}`;

export const { resetStatus: resetRemovedExposeFieldStatus } = removeTriggerExposeFieldSlice.actions;
