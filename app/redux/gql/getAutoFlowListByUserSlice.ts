import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getAutoFlowListByUser = createAsyncThunk(
  'getAutoFlowListByUser',
  async (variables: GetAutoFlowsByUserQueryVariables) => {
    return sendRequest<GetAutoFlowsByUserQuery>({
      variables,
      query: GetAutoFlowsByUserDocument,
    });
  },
);

const initialState: InitialStateType = {
  autoFlowList: [],
  status: undefined,
  error: undefined,
};

export const getAutoFlowListByUserSlice = createSlice({
  name: 'getAutoFlowListByUserSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAutoFlowListByUser.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getAutoFlowListByUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.autoFlowList= payload?.data?.autoFlowListByUser?? [];
        }
      })
      .addCase(getAutoFlowListByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  autoFlowList: Types.AutoFlow[];
  status: string | undefined;
  error: string | undefined;
}

export type GetAutoFlowsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int'];
}>;


export type GetAutoFlowsByUserQuery = { __typename?: 'Query', autoFlowListByUser?: Array<{ __typename?: 'AutoFlow', id?: number | null, code?: string | null, archived?: number | null, published?: number | null, title?: string | null, userId?: number | null }> | null };


export const GetAutoFlowsByUserDocument = `
    query getAutoFlowsByUser($userId: Int!) {
  autoFlowListByUser(userId: $userId) {
    id
    code
    archived
    published
    title
    userId
  }
}
    `;
