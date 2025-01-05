import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getServiceTriggerById = createAsyncThunk(
  'getServiceTriggerById',
  async (variables: GetServiceTriggerQueryVariables ) => {
    return sendRequest<GetServiceTriggerQuery>({
      variables,
      query: GetServiceTriggerDocument ,
    });
  },
);

const initialState: InitialStateType = {
  trigger: undefined,
  status: undefined,
  error: undefined,
};

export const getServiceTriggerByIdSlice= createSlice({
  name: 'getServiceTriggerByIdSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceTriggerById.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceTriggerById.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.trigger = payload?.data?.triggerById;
        }
      })
      .addCase(getServiceTriggerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  trigger: Types.ServiceTrigger | undefined | null;
  status: string | undefined;
  error: string | undefined;
}
export type GetServiceTriggerQueryVariables = Types.Exact<{
  triggerId: Types.Scalars['Int'];
}>;


export type GetServiceTriggerQuery = { __typename?: 'Query', triggerById?: { __typename?: 'ServiceTrigger', id?: number | null, name?: string | null, description?: string | null, endpointPath: string, endpointType?: number | null, serviceApiId?: number | null } | null };


export const GetServiceTriggerDocument = `
    query getServiceTrigger($triggerId: Int!) {
  triggerById(triggerId: $triggerId) {
    id
    name
    description
    endpointPath
    endpointType
    serviceApiId
  }
}`;
