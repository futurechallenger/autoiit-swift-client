import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateFieldOption = createAsyncThunk(
  'updateFieldOption',
  async (variables: UpdateFieldOptionMutationVariables) => {
    return sendRequest<UpdateFieldOptionMutation>({
      variables,
      query: UpdateFieldOptionDocument,
    });
  },
);

const initialState: InitialStateType = {
  fieldOption: undefined,
  status: undefined,
  error: undefined,
};

export const updateFieldOptionSlice = createSlice({
  name: 'updateFieldOptionSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateFieldOption.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateFieldOption.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.fieldOption = payload?.data?.updateFieldOption;
        }
      })
      .addCase(updateFieldOption.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  fieldOption: Types.FieldOption | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateFieldOptionMutationVariables = Types.Exact<{
  fieldOption: Types.FieldOptionInput;
}>;

export type UpdateFieldOptionMutation = {
  __typename?: 'Mutation';
  updateFieldOption?: {
    __typename?: 'FieldOption';
    id?: number | null;
    label?: string | null;
    value?: string | null;
    triggerId?: number | null;
    actionId?: number | null;
  } | null;
};

export const UpdateFieldOptionDocument = `
    mutation updateFieldOption($fieldOption: FieldOptionInput!) {
  updateFieldOption(option: $fieldOption) {
    id
    label
    value
    triggerId
    actionId
  }
}`;
