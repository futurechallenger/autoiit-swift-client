import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getActionMappingFieldList = createAsyncThunk(
  'getActionMappingFieldList',
  async (variables: GetActionMappingFieldsListQueryVariables) => {
    return sendRequest<GetActionMappingFieldsListQuery>({
      variables,
      query: GetActionMappingFieldsListDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionMappingFieldList: null,
  status: undefined,
  error: undefined,
};

export const getActionMappingFieldListSlice = createSlice({
  name: 'getActionMappingFieldListSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getActionMappingFieldList.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getActionMappingFieldList.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionMappingFieldList = payload?.data?.actionMappingFieldList;
        }
      })
      .addCase(getActionMappingFieldList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionMappingFieldList: Types.ActionMappingField[] | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetActionMappingFieldsListQueryVariables = Types.Exact<{
  flowId: Types.Scalars['Int'];
}>;


export type GetActionMappingFieldsListQuery = { __typename?: 'Query', actionMappingFieldList?: Array<{ __typename?: 'ActionMappingField', id?: number | null, fieldValue?: string | null, label?: string | null, mapping?: string | null, exposeFieldInfo?: string | null, actionOutputFieldId?: number | null, autoFlowId?: number | null }> | null };


export const GetActionMappingFieldsListDocument = `
    query getActionMappingFieldsList($flowId: Int!) {
  actionMappingFieldList(autoFlowId: $flowId) {
    id
    fieldValue
    label
    mapping
    exposeFieldInfo
    actionOutputFieldId
    autoFlowId
  }
}
    `;
