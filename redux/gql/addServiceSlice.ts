import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addService = createAsyncThunk('createService', async (variables: AddServiceMutationVariables) => {
  return sendRequest<AddServiceMutation>({
    variables,
    query: AddServiceDocument,
  });
});

const initialState: InitialStateType = {
  serviceId: undefined,
  error: undefined,
  status: undefined,
};

export const addServiceSlice = createSlice({
  name: 'addServiceSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addService.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.serviceId = payload?.data?.addService?.id ?? [];
        }
      })
      .addCase(addService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  serviceId: number | undefined;
  error: string | undefined;
  status: string | undefined;
}

export type AddServiceMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  serviceCode: Types.Scalars['String'];
  description?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type AddServiceMutation = {
  __typename?: 'Mutation';
  addService: { __typename?: 'Service'; id: number };
};

export const AddServiceDocument = `
    mutation addService($name: String!, $serviceCode: String!, $description: String ) {
  addService(name: $name, serviceCode: $serviceCode, description: $description) {
    id
  }
}`;

export const { resetStatus } = addServiceSlice.actions;
