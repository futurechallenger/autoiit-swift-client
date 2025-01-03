import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getConnectionStatus = createAsyncThunk(
  'getConnectionStatus',
  async (variables: ConnectionStatusQueryVariables) => {
    return sendRequest<ConnectionStatusQuery>({ variables, query: ConnectionStatusDocument });
  },
);

const initialState: InitialStateType = {
  connectionStatus: false,
  status: undefined,
  error: undefined,
};

export const getConnectionStatusSlice = createSlice({
  name: 'getConnectionStatusSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getConnectionStatus.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getConnectionStatus.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.connectionStatus = payload?.data?.connectionStatus ?? false;
        }
      })
      .addCase(getConnectionStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  connectionStatus: boolean;
  status: string | undefined;
  error: string | undefined;
}

export type ConnectionStatusQueryVariables = Types.Exact<{
  serviceId: Types.Scalars['Int'];
}>;

export type ConnectionStatusQuery = { __typename?: 'Query'; connectionStatus: boolean };

export const ConnectionStatusDocument = `
    query connectionStatus($serviceId: Int!) {
  connectionStatus(serviceId: $serviceId)
}`;
