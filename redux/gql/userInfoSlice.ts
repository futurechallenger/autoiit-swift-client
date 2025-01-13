import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Types from '../types.generated';

import { sendRequest } from '../baseApi';

export const getUserInfo = createAsyncThunk('userInfo', async (variables: FindUserQueryVariables) => {
  return sendRequest<FindUserQuery>({ query: FindUserDocument, variables });
});

const initialState: {
  userInfo: any;
  status: string;
  error: string | undefined;
} = {
  userInfo: {},
  status: '',
  error: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.error = payload?.errors?.[0]?.message;
          state.status = 'failed';
        } else {
          state.status = 'succeeded';
          state.userInfo = payload.data?.userInfo;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export type FindUserQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  userInfo?: { __typename?: 'UserInfo'; name?: string | null } | null;
};

export const FindUserDocument = `
query findUser($email: String!) {
  userInfo(email: $email) {
    name
  }
}
`;
