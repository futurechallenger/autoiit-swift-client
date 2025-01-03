import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getActionOutputFieldList = createAsyncThunk(
  'getActionOutputFieldList',
  async (variables: GetActionOutputFieldsQueryVariables) => {
    return sendRequest<GetActionOutputFieldsQuery>({
      variables,
      query: GetActionOutputFieldsDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionOutputFieldList: null,
  status: undefined,
  error: undefined,
};

export const getActionOutputFieldListSlice = createSlice({
  name: 'getActionOutputFieldListSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getActionOutputFieldList.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getActionOutputFieldList.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionOutputFieldList = payload?.data?.actionOutputFieldList;
        }
      })
      .addCase(getActionOutputFieldList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionOutputFieldList: Types.ActionOutputField[] | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetActionOutputFieldsQueryVariables = Types.Exact<{
  serviceApiActionId: Types.Scalars['Int'];
}>;


export type GetActionOutputFieldsQuery = { __typename?: 'Query', actionOutputFieldList?: Array<{ __typename?: 'ActionOutputField', id?: number | null, keyName?: string | null, label?: string | null, helperText?: string | null, fieldType?: number | null, fieldSourceApi?: string | null, serviceApiActionId?: number | null }> | null };


export const GetActionOutputFieldsDocument = `
    query getActionOutputFields($serviceApiActionId: Int!) {
  actionOutputFieldList(serviceApiActionId: $serviceApiActionId) {
    id
    keyName
    label
    helperText
    fieldType
    fieldSourceApi
    serviceApiActionId
  }
}
    `;
