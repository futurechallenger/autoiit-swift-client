import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const getActionOutputField = createAsyncThunk(
  'getActionOutputField',
  async (variables: ActionOutputFieldQueryVariables) => {
    return sendRequest<ActionOutputFieldQuery>({
      variables,
      query: ActionOutputFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionOutputField: null,
  status: undefined,
  error: undefined,
};

export const getActionOutputFieldSlice = createSlice({
  name: 'getActionOutputFieldSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getActionOutputField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getActionOutputField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionOutputField = payload?.data?.actionOutputField;
        }
      })
      .addCase(getActionOutputField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionOutputField: Types.ActionOutputField | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type ActionOutputFieldQueryVariables = Types.Exact<{
  actionOutputFieldId: Types.Scalars['Int'];
}>;


export type ActionOutputFieldQuery = {
  __typename?: 'Query',
  actionOutputField?: {
    __typename?: 'ActionOutputField', id?: number | null, keyName?: string | null, label?: string | null, helperText?: string | null, fieldType?: number | null, fieldSourceApi?: string | null, serviceApiActionId?: number | null
  } | null
};


export const ActionOutputFieldDocument = `
    query actionOutputField($actionOutputFieldId: Int!) {
  actionOutputField(actionOutputFieldId: $actionOutputFieldId) {
    id
    keyName
    label
    helperText
    fieldType
    fieldSourceApi
    serviceApiActionId
  }
}
    `;
