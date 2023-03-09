import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getCurrentUserInfo = createAsyncThunk(
  'getCurrentUserInfo',
  async (variables: GetCurrentUserInfoQueryVariables) => {
    return sendRequest<GetCurrentUserInfoQuery>({
      variables,
      query: GetCurrentUserInfoDocument,
    });
  },
);

const initialState: InitialStateType = {
  userInfo: undefined,
  status: undefined,
  error: undefined,
};

export const getCurrentUserInfoSlice = createSlice({
  name: 'getCurrentUserInfoSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrentUserInfo.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.userInfo = payload?.data?.currentUserInfo;
        }
      })
      .addCase(getCurrentUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  userInfo: Types.UserInfo | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetCurrentUserInfoQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCurrentUserInfoQuery = {
  __typename?: 'Query';
  currentUserInfo?: { __typename?: 'UserInfo'; id?: number | null; name?: string | null; email?: string | null } | null;
};

export const GetCurrentUserInfoDocument = `
    query getCurrentUserInfo {
  currentUserInfo {
    id
    name
    email
  }
}`;
