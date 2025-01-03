import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getTriggerExposeFieldList = createAsyncThunk(
  'getTriggerExposeFieldList',
  async (variables: GetTriggerExposeFieldListQueryVariables) => {
    return sendRequest<GetTriggerExposeFieldListQuery>({
      variables,
      query: GetTriggerExposeFieldListDocument,
    });
  },
);

const initialState: InitialStateType = {
  exposeFields: [],
  status: undefined,
  error: undefined,
};

export const getTriggerExposeFieldListSlice = createSlice({
  name: 'getTriggerExposeFieldListSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTriggerExposeFieldList.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getTriggerExposeFieldList.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.exposeFields = payload?.data?.getExposeFields ?? [];
        }
      })
      .addCase(getTriggerExposeFieldList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  exposeFields: Types.ExposeField[];
  status: string | undefined;
  error: string | undefined;
}

export type GetTriggerExposeFieldListQueryVariables = Types.Exact<{
  triggerId: Types.Scalars['Int'];
}>;

export type GetTriggerExposeFieldListQuery = {
  __typename?: 'Query';
  getExposeFields?: Array<{
    __typename?: 'ExposeField';
    id?: number | null;
    label?: string | null;
    keyName?: string | null;
    helperText?: string | null;
    example?: string | null;
    fieldType?: number | null;
    serviceTriggerId?: number | null;
  }> | null;
};

export const GetTriggerExposeFieldListDocument = `
    query getTriggerExposeFieldList($triggerId: Int!) {
  getExposeFields(triggerId: $triggerId) {
    id
    label
    keyName
    helperText
    example
    fieldType
    serviceTriggerId
  }
}
    `;
