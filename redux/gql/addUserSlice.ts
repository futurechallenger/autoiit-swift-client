import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addUser= createAsyncThunk(
  'addUserAction',
  async (variables: AddUserMutationVariables) => {
    return sendRequest<AddUserMutation>({
      variables,
      query: AddUserDocument,
    });
  },
);

const initialState: InitialStateType = {
  user: undefined,
  status: undefined,
  error: undefined,
};

export const addUserSlice= createSlice({
  name: 'addUserSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUser.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.user= payload?.data?.addUser
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  user: Types.UserInfo| null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddUserMutationVariables = Types.Exact<{
  user: Types.UserInfoInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'UserInfo', id?: number | null, name?: string | null, email?: string | null } | null };


export const AddUserDocument = `
    mutation addUser($user: UserInfoInput!) {
  addUser(user: $user) {
    id
    name
    email
  }
}`;
