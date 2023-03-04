import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getFieldMappingItems = createAsyncThunk(
  'getFieldMappingItems',
  async (variables: GetFieldMappingItemsQueryVariables) => {
    return sendRequest<GetFieldMappingItemsQuery>({
      variables,
      query: GetFieldMappingItemsDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldMappingItems: [],
  status: undefined,
  error: undefined,
};

export const getFieldMappingItemsSlice= createSlice({
  name: 'getFieldMappingItemsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFieldMappingItems.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getFieldMappingItems.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.fieldMappingItems= payload?.data?.fieldMappingItems ?? [];
        }
      })
      .addCase(getFieldMappingItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  fieldMappingItems: Types.FieldMappingItem[];
  status: string | undefined;
  error: string | undefined;
}

export type GetFieldMappingItemsQueryVariables = Types.Exact<{
  actionFieldIds: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;


export type GetFieldMappingItemsQuery = { __typename?: 'Query', fieldMappingItems?: Array<{ __typename?: 'FieldMappingItem', id?: number | null, value?: string | null, exposeFieldId?: number | null, exposeLabel?: string | null, actionInputFieldId?: number | null }> | null };


export const GetFieldMappingItemsDocument = `
    query getFieldMappingItems($actionFieldIds: [Int!]!) {
  fieldMappingItems(actionInputFieldIds: $actionFieldIds) {
    id
    value
    exposeFieldId
    exposeLabel
    actionInputFieldId
  }
}`;
