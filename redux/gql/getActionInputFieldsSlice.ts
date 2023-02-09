import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getActionInputFields = createAsyncThunk(
  'getActionInputFields',
  async (variables: ActionInputFieldsQueryVariables) => {
    return sendRequest<ActionInputFieldsQuery>({
      variables,
      query: ActionInputFieldsDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionInputFields: [],
  status: undefined,
  error: undefined,
};

export const getActionInputFieldsSlice = createSlice({
  name: 'getActionInputFieldsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getActionInputFields.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getActionInputFields.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionInputFields = payload?.data?.actionInputFields ?? [];
        }
      })
      .addCase(getActionInputFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionInputFields: Types.ActionInputField[];
  status: string | undefined;
  error: string | undefined;
}

export type ActionInputFieldsQueryVariables = Types.Exact<{
  actionId: Types.Scalars['Int'];
}>;

export type ActionInputFieldsQuery = {
  __typename?: 'Query';
  actionInputFields?: Array<{
    __typename?: 'ActionInputField';
    id?: number | null;
    keyName?: string | null;
    label?: string | null;
    helperText?: string | null;
    fieldType?: number | null;
    serviceApiActionId?: number | null;
  }> | null;
};

export const ActionInputFieldsDocument = `
    query actionInputFields($actionId: Int!) {
  actionInputFields(actionId: $actionId) {
    id
    keyName
    label
    helperText
    fieldType
    serviceApiActionId
  }
}`;
