import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateAutoFlow = createAsyncThunk(
  'updateAutoFlow',
  async (variables: UpdateAutoFlowMutationVariables) => {
    return sendRequest<UpdateAutoFlowMutation>({
      variables,
      query: UpdateAutoFlowDocument,
    });
  },
);

const initialState: InitialStateType = {
  autoFlow: undefined,
  status: undefined,
  error: undefined,
};

export const updateAutoFlowSlice = createSlice({
  name: 'updateAutoFlowSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateAutoFlow.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateAutoFlow.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlow = payload?.data?.updateAutoFlow;
        }
      })
      .addCase(updateAutoFlow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  autoFlow: Types.AutoFlow | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateAutoFlowMutationVariables = Types.Exact<{
  autoFlow: Types.AutoFlowInput;
}>;

export type UpdateAutoFlowMutation = {
  __typename?: 'Mutation';
  updateAutoFlow?: Types.AutoFlow | null;
};

export const UpdateAutoFlowDocument = `
    mutation updateAutoFlow($autoFlow: AutoFlowInput!) {
  updateAutoFlow(af: $autoFlow) {
    id
    code
    archived
    title
    triggerId
    triggerInfo
    actionId
    actionInfo
    userId
  }
}`;
