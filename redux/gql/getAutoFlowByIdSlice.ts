import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getAutoFlowById = createAsyncThunk(
  'getAutoFlowById',
  async (variables: AutoFlowByIdQueryVariables) => {
    return sendRequest<AutoFlowByIdQuery>({
      variables,
      query: AutoFlowByIdDocument,
    });
  },
);

const initialState: InitialStateType = {
  autoFlow: undefined,
  status: undefined,
  error: undefined,
};

export const getAutoFlowByIdSlice = createSlice({
  name: 'getAutoFlowByIdSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAutoFlowById.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getAutoFlowById.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlow = payload?.data?.autoFlow;
        }
      })
      .addCase(getAutoFlowById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  autoFlow: Types.AutoFlow[] | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AutoFlowByIdQueryVariables = Types.Exact<{
  flowId: Types.Scalars['Int'];
}>;

export type AutoFlowByIdQuery = {
  __typename?: 'Query';
  autoFlow?: Types.AutoFlow | null;
};

export const AutoFlowByIdDocument = `
    query autoFlowById($flowId: Int!) {
  autoFlow(flowId: $flowId) {
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
