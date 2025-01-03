import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getTriggerFields = createAsyncThunk(
  'getTriggerFields',
  async (variables: GetTriggersFieldsQueryVariables) => {
    return sendRequest<GetTriggersFieldsQuery>({
      variables,
      query: GetTriggersFieldsDocument,
    });
  },
);

const initialState: InitialStateType = {
  triggerFields: [],
  status: undefined,
  error: undefined,
};

export const getTriggerFieldsSlice = createSlice({
  name: 'getTriggerFieldsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTriggerFields.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getTriggerFields.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.triggerFields = payload?.data?.triggerFieldsBy ?? [];
        }
      })
      .addCase(getTriggerFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  triggerFields: Types.TriggerField[];
  status: string | undefined;
  error: string | undefined;
}

export type GetTriggersFieldsQueryVariables = Types.Exact<{
  triggerId: Types.Scalars['Int'];
}>;

export type GetTriggersFieldsQuery = {
  __typename?: 'Query';
  triggerFieldsBy?: Array<Types.TriggerField> | null;
};

export const GetTriggersFieldsDocument = `
    query getTriggersFields($triggerId: Int!) {
  triggerFieldsBy(triggerId: $triggerId) {
    id
    keyName
    label
    helperText
    deleted
    inputType
    inputSourceType
    inputSourceApi
    validationRule
    validationRequired
    serviceTriggerId
  }
}`;
