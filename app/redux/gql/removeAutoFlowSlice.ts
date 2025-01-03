import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const removeAutoFlow = createAsyncThunk('removeAutoFlow', async (variables: RemoveAutoFlowMutationVariables) => {
  return sendRequest<RemoveAutoFlowMutation>({
    variables,
    query: RemoveAutoFlowDocument,
  });
});

const initialState: InitialStateType = {
  autoFlowId: undefined,
  status: undefined,
  error: undefined,
};

export const removeAutoFlowSlice = createSlice({
  name: 'removeAutoFlowSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(removeAutoFlow.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(removeAutoFlow.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlowId = payload?.data?.removeAutoFlow?.id;
        }
      })
      .addCase(removeAutoFlow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  autoFlowId: number | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type RemoveAutoFlowMutationVariables = Types.Exact<{
  flowId: Types.Scalars['Int'];
}>;

export type RemoveAutoFlowMutation = {
  __typename?: 'Mutation';
  removeAutoFlow?: { __typename?: 'AutoFlow'; id?: number | null } | null;
};

export const RemoveAutoFlowDocument = `
    mutation removeAutoFlow($flowId: Int!) {
  removeAutoFlow(autoFlowId: $flowId) {
    id
  }
}
    `;

export const { resetStatus: resetRemovedExposeFieldStatus } = removeAutoFlowSlice.actions;
