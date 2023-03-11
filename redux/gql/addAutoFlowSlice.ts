import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addAutoFlow = createAsyncThunk(
  'addAutoFlow',
  async (variables: AddAutoFlowMutationVariables) => {
    return sendRequest<AddAutoFlowMutation>({
      variables,
      query: AddAutoFlowDocument,
    });
  },
);

const initialState: InitialStateType = {
  autoFlow: undefined,
  status: undefined,
  error: undefined,
};

export const AddAutoFlowSlice = createSlice({
  name: 'AddAutoFlowSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAutoFlow.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addAutoFlow.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlow = payload?.data?.addAutoFlow;
        }
      })
      .addCase(addAutoFlow.rejected, (state, action) => {
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

export type AddAutoFlowMutationVariables = Types.Exact<{
  flow: Types.AutoFlowInput;
}>;

export type AddAutoFlowMutation = {
  __typename?: 'Mutation';
  addAutoFlow?: {
    __typename?: 'AutoFlow';
    id?: number | null;
    title?: string | null;
    triggerId?: number | null;
    triggerInfo?: string | null;
    actionId?: number | null;
    actionInfo?: string | null;
    userId?: number | null;
  } | null;
};

export const AddAutoFlowDocument = `
    mutation addAutoFlow($flow: AutoFlowInput!) {
  addAutoFlow(af: $flow) {
    id
    title
    archived
    triggerId
    triggerInfo
    actionId
    actionInfo
    userId
  }
}`;

export const { resetStatus } = AddAutoFlowSlice.actions;
