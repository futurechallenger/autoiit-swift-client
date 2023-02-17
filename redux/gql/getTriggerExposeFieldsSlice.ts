import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getTriggerExposeFields = createAsyncThunk(
  'getTriggerExposeFields',
  async (variables: GetExposeFieldsQueryVariables) => {
    return sendRequest<GetExposeFieldsQuery>({
      variables,
      query: GetExposeFieldsDocument,
    });
  },
);

const initialState: InitialStateType = {
  exposeFields: [],
  status: undefined,
  error: undefined,
};

export const getTriggerExposeFieldsSlice = createSlice({
  name: 'getTriggerExposeFieldsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTriggerExposeFields.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getTriggerExposeFields.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.exposeFields = payload?.data?.getExposeFields ?? [];
        }
      })
      .addCase(getTriggerExposeFields.rejected, (state, action) => {
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

export type GetExposeFieldsQueryVariables = Types.Exact<{
  triggerId: Types.Scalars['Int'];
}>;

export type GetExposeFieldsQuery = {
  __typename?: 'Query';
  getExposeFields?: Array<{
    __typename?: 'ExposeField';
    id?: number | null;
    keyName?: string | null;
    label?: string | null;
    helperText?: string | null;
    fieldType?: number | null;
    parserPath?: string | null;
    serviceTriggerId?: number | null;
  }> | null;
};

export const GetExposeFieldsDocument = `
    query getExposeFields($triggerId: Int!) {
  getExposeFields(triggerId: $triggerId) {
    id
    keyName
    label
    helperText
    fieldType
    parserPath
    serviceTriggerId
  }
}
    `;
