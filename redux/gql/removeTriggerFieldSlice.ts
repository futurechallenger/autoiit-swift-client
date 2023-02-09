import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const deleteTriggerField = createAsyncThunk(
  'remvoeTriggerField',
  async (variables: DeleteTriggerFieldMutationVariables) => {
    return sendRequest<DeleteTriggerFieldMutation>({
      variables,
      query: DeleteTriggerFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  deleted: undefined,
  status: undefined,
  error: undefined,
};

export const deleteTriggerFieldSlice = createSlice({
  name: 'deleteTriggerFieldSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteTriggerField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(deleteTriggerField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.deleted = payload?.data?.removeTriggerField;
        }
      })
      .addCase(deleteTriggerField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  deleted: boolean | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type DeleteTriggerFieldMutationVariables = Types.Exact<{
  fieldId: Types.Scalars['Int'];
}>;

export type DeleteTriggerFieldMutation = {
  __typename?: 'Mutation';
  removeTriggerField: boolean;
};

export const DeleteTriggerFieldDocument = `
    mutation deleteTriggerField($fieldId: Int!) {
  removeTriggerField(triggerFieldId: $fieldId)
}`;
