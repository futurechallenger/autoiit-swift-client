import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const addActionMappingField = createAsyncThunk(
  'addActionMappingField',
  async (variables: AddActionMappingFieldMutationVariables) => {
    return sendRequest<AddActionMappingFieldMutation>({
      variables,
      query: AddActionMappingFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionMappingField: undefined,
  status: undefined,
  error: undefined,
};

export const addActionMappingFieldSlice = createSlice({
  name: 'addActionMappingFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addActionMappingField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addActionMappingField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionMappingField= payload?.data?.addActionMappingField;
        }
      })
      .addCase(addActionMappingField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionMappingField: Types.ActionMappingField | undefined | null;
  status: string | undefined;
  error: string | undefined;
}

export type AddActionMappingFieldMutationVariables = Types.Exact<{
  actionMappingField: Types.ActionMappingFieldInput;
}>;


export type AddActionMappingFieldMutation = { __typename?: 'Mutation', addActionMappingField?: { __typename?: 'ActionMappingField', id?: number | null, fieldValue?: string | null, label?: string | null, mapping?: string | null, exposeFieldInfo?: string | null, actionOutputFieldId?: number | null, autoFlowId?: number | null } | null };


export const AddActionMappingFieldDocument = `
    mutation addActionMappingField($actionMappingField: ActionMappingFieldInput!) {
  addActionMappingField(actionMappingField: $actionMappingField) {
    id
    fieldValue
    label
    mapping
    exposeFieldInfo
    actionOutputFieldId
    autoFlowId
  }
}
    `;
