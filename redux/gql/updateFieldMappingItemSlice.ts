import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateFieldMappingItem = createAsyncThunk(
  'updateFieldMappingItem',
  async (variables: UpdateFieldMappingItemMutationVariables) => {
    return sendRequest<UpdateFieldMappingItemMutation>({
      variables,
      query: UpdateFieldMappingItemDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldMappingItem: undefined,
  status: undefined,
  error: undefined,
};

export const updateFieldMappingItemSlice= createSlice({
  name: 'updateFieldMappingItemSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateFieldMappingItem.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateFieldMappingItem.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.fieldMappingItem = payload?.data?.updateFieldMappingItem;
        }
      })
      .addCase(updateFieldMappingItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  fieldMappingItem : Types.FieldMappingItem | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateFieldMappingItemMutationVariables = Types.Exact<{
  mappingItem: Types.FieldMappingItemInput;
}>;


export type UpdateFieldMappingItemMutation = { __typename?: 'Mutation', updateFieldMappingItem?: { __typename?: 'FieldMappingItem', id?: number | null, value?: string | null, exposeFieldId?: number | null, exposeLabel?: string | null, actionInputFieldId?: number | null } | null };


export const UpdateFieldMappingItemDocument = `
    mutation updateFieldMappingItem($mappingItem: FieldMappingItemInput!) {
  updateFieldMappingItem(mappingItem: $mappingItem) {
    id
    value
    exposeFieldId
    exposeLabel
    actionInputFieldId
  }
}`;
