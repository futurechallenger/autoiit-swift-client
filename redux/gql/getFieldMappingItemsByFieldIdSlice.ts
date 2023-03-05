import { ActionInputField } from './../types.generated';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getFieldMappingItemsByFieldId = createAsyncThunk(
  'getFieldMappingItemsByFieldId',
  async (variables: GetFieldMappingItemsByFieldIdQueryVariables) => {
    return sendRequest<GetFieldMappingItemsByFieldIdQuery>({
      variables,
      query: GetFieldMappingItemsByFieldIdDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldMappingItems: {},
  status: undefined,
  error: undefined,
};

export const getFieldMappingItemsByFieldIdSlice= createSlice({
  name: 'getFieldMappingItemsByFieldIdSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFieldMappingItemsByFieldId.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getFieldMappingItemsByFieldId.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          // state.fieldMappingItems= payload?.data?.fieldMappingItemsByFieldId ?? [];
          if(action.meta.arg.actionInputFieldId) {
            state.fieldMappingItems[`${action.meta.arg.actionInputFieldId}`] = (payload?.data?.fieldMappingItemsByFieldId ?? []) as Types.FieldMappingItem[];
          }
        }
      })
      .addCase(getFieldMappingItemsByFieldId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  fieldMappingItems: {actionInputFieldId: number,  items: Types.FieldMappingItem[]};
  status: string | undefined;
  error: string | undefined;
}

export type GetFieldMappingItemsByFieldIdQueryVariables = Types.Exact<{
  actionInputFieldId: Types.Scalars['Int'];
}>;


export type GetFieldMappingItemsByFieldIdQuery = { __typename?: 'Query', fieldMappingItemsByFieldId?: Array<{ __typename?: 'FieldMappingItem', id?: number | null, value?: string | null, exposeFieldId?: number | null, exposeLabel?: string | null, actionInputFieldId?: number | null }> | null };


export const GetFieldMappingItemsByFieldIdDocument = `
    query getFieldMappingItemsByFieldId($actionInputFieldId: Int!) {
  fieldMappingItemsByFieldId(actionInputFieldId: $actionInputFieldId) {
    id
    value
    exposeFieldId
    exposeLabel
    actionInputFieldId
  }
}`;
