import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getAutoFlowsByService = createAsyncThunk(
  'getAutoFlowsByService',
  async (variables: GetAllFlowsQueryVariables) => {
    return sendRequest<GetAllFlowsQuery>({
      variables,
      query: GetAllFlowsDocument,
    });
  },
);

const initialState: InitialStateType = {
  autoFlows: [],
  status: undefined,
  error: undefined,
};

export const getAutoFlowsByServiceSlice = createSlice({
  name: 'getAutoFlowsByServiceSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAutoFlowsByService.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getAutoFlowsByService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlows = payload?.data?.flowsByService ?? [];
        }
      })
      .addCase(getAutoFlowsByService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  autoFlows: Types.AutoFlow[];
  status: string | undefined;
  error: string | undefined;
}

export type GetAllFlowsQueryVariables = Types.Exact<{
  serviceId: Types.Scalars['Int'];
}>;

export type GetAllFlowsQuery = {
  __typename?: 'Query';
  flowsByService?: Array<Types.AutoFlow> | null;
};

export const GetAllFlowsDocument = `
    query getAllFlows($serviceId: Int!) {
  flowsByService(serviceId: $serviceId) {
    id
    triggerId
    actionId
    triggerInfo
    actionInfo
		published
  }
}`;
