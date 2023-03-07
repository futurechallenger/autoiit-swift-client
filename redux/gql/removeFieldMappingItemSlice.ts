import { FieldMappingItem } from './../types.generated';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const removeFieldMappingItem = createAsyncThunk(
  'removeFieldMappingItem',
  async (variables: RemoveFieldMappingItemMutationVariables) => {
    return sendRequest<RemoveFieldMappingItemMutation>({
      variables,
      query: RemoveFieldMappingItemDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldMappingItem: undefined,
  status: undefined,
  error: undefined,
};

export const removeFieldMappingItemSlice = createSlice({
  name: 'removeFieldMappingItemSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(removeFieldMappingItem.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(removeFieldMappingItem.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.fieldMappingItem = payload?.data?.deleteFieldMappingItem;
        }
      })
      .addCase(removeFieldMappingItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  fieldMappingItem: Types.FieldMappingItem | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type RemoveFieldMappingItemMutationVariables = Types.Exact<{
  mappingId: Types.Scalars['Int'];
}>;

export type RemoveFieldMappingItemMutation = {
  __typename?: 'Mutation';
  deleteFieldMappingItem?: Types.FieldMappingItem;
};

export const RemoveFieldMappingItemDocument = `
    mutation removeFieldMappingItem($mappingId: Int!) {
  deleteFieldMappingItem(mappingId: $mappingId) {
    id
    value
    exposeFieldId
    exposeLabel
    actionInputFieldId
  }
}`;
