import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';


export const addFieldMappingItems = createAsyncThunk(
  'addFieldMappingItems',
  async (variables: AddFieldMappingItemsMutationVariables) => {
    return sendRequest<AddFieldMappingItemsMutation>({
      variables,
      query:AddFieldMappingItemsDocument,
    });
  },
);

const initialState: InitialStateType = {
  count: undefined,
  status: undefined,
  error: undefined,
};

export const addFieldMappingItemsSlice = createSlice({
  name: 'addFieldMappingItemsSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFieldMappingItems.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addFieldMappingItems.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.count = payload?.data?.addFieldMappingItems ?? -1;
        }
      })
      .addCase(addFieldMappingItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  count: number | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddFieldMappingItemsMutationVariables = Types.Exact<{
  mappingItems: Array<Types.FieldMappingItemInput> | Types.FieldMappingItemInput;
}>;


export type AddFieldMappingItemsMutation = { __typename?: 'Mutation', addFieldMappingItems: number };


export const AddFieldMappingItemsDocument = `
    mutation addFieldMappingItems($mappingItems: [FieldMappingItemInput!]!) {
  addFieldMappingItems(mappingItems: $mappingItems)
}`;
