import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getFieldOptions = createAsyncThunk(
  'getFieldOptions',
  async (variables: GetFieldOptionsQueryVariables) => {
    return sendRequest<GetFieldOptionsQuery>({
      variables,
      query: GetFieldOptionsDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldOptions: [],
  status: undefined,
  error: undefined,
};

export const getFieldOptionsSlice = createSlice({
  name: 'getFieldOptionsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFieldOptions.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getFieldOptions.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.fieldOptions = payload?.data?.fieldOptionsByType ?? [];
        }
      })
      .addCase(getFieldOptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  getServiceTriggers: Types.FieldOption[];
  status: string | undefined;
  error: string | undefined;
}

export type GetFieldOptionsQueryVariables = Types.Exact<{
  typeId: Types.Scalars['Int'];
  relationId: Types.Scalars['Int'];
}>;

export type GetFieldOptionsQuery = {
  __typename?: 'Query';
  fieldOptionsByType?: Array<{
    __typename?: 'FieldOption';
    id?: number | null;
    label?: string | null;
    value?: string | null;
    triggerId?: number | null;
    actionId?: number | null;
  }> | null;
};

export const GetFieldOptionsDocument = `
    query getFieldOptions($typeId: Int!, $relationId: Int!) {
  fieldOptionsByType(typeId: $typeId, relationId: $relationId) {
    id
    label
    value
    triggerId
    actionId
  }
}
    `;
