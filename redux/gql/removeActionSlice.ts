import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const deleteServiceAction = createAsyncThunk(
  'deleteServiceAction',
  async (variables: RemoveActionMutationVariables) => {
    return sendRequest<RemoveActionMutation>({
      variables,
      query: RemoveActionDocument,
    });
  },
);

const initialState: InitialStateType = {
  deleted: undefined,
  status: undefined,
  error: undefined,
};

export const deleteServiceActionSlice = createSlice({
  name: 'deleteServiceActionSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteServiceAction.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(deleteServiceAction.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.deleted = !!payload?.data?.deleteServiceAction;
        }
      })
      .addCase(deleteServiceAction.rejected, (state, action) => {
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

export type RemoveActionMutationVariables = Types.Exact<{
  actionId: Types.Scalars['Int'];
}>;

export type RemoveActionMutation = {
  __typename?: 'Mutation';
  deleteServiceAction?: {
    __typename?: 'ServiceAction';
    id?: number | null;
  } | null;
};

export const RemoveActionDocument = `
    mutation removeAction($actionId: Int!) {
  deleteServiceAction(serviceActionId: $actionId) {
    id
  }
}`;
