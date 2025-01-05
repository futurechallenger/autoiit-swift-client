import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateServiceAction = createAsyncThunk(
  'updateServiceAction',
  async (variables: UpdateActionMutationVariables) => {
    return sendRequest<UpdateActionMutation>({
      variables,
      query: UpdateActionDocument,
    });
  },
);

const initialState: InitialStateType = {
  action: undefined,
  status: undefined,
  error: undefined,
};

export const updateServiceActionSlice = createSlice({
  name: 'updateServiceActionSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateServiceAction.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateServiceAction.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.action = payload?.data?.updateServiceAction;
        }
      })
      .addCase(updateServiceAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  action: Types.ServiceAction | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateActionMutationVariables = Types.Exact<{
  action: Types.ServiceActionInput;
}>;

export type UpdateActionMutation = {
  __typename?: 'Mutation';
  updateServiceAction?: {
    __typename?: 'ServiceAction';
    id?: number | null;
    name?: string | null;
    description?: string | null;
    endpointPath?: string | null;
    serviceApiId?: number | null;
  } | null;
};

export const UpdateActionDocument = `
    mutation updateAction($action: ServiceActionInput!) {
  updateServiceAction(serviceAction: $action) {
    id
    name
    description
    endpointPath
    serviceApiId
  }
}`;
