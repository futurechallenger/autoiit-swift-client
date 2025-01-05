import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addFieldOptions = createAsyncThunk(
  'addFieldOptions',
  async (variables: AddFieldOptionsMutationVariables) => {
    return sendRequest<AddFieldOptionsMutation>({
      variables,
      query: AddFieldOptionsDocument,
    });
  },
);

const initialState: InitialStateType = {
  count: undefined,
  status: undefined,
  error: undefined,
};

export const addFieldOptionsSlice = createSlice({
  name: 'addFieldOptionsSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFieldOptions.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addFieldOptions.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.count = payload?.data?.addFieldOptions ?? -1;
        }
      })
      .addCase(addFieldOptions.rejected, (state, action) => {
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

export type AddFieldOptionsMutationVariables = Types.Exact<{
  fieldOptions: Array<Types.FieldOptionInput> | Types.FieldOptionInput;
}>;

export type AddFieldOptionsMutation = {
  __typename?: 'Mutation';
  addFieldOptions?: number | null;
};

export const AddFieldOptionsDocument = `
    mutation addFieldOptions($fieldOptions: [FieldOptionInput!]!) {
  addFieldOptions(options: $fieldOptions)
}`;
