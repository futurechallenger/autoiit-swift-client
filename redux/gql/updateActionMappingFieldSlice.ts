import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../baseApi';

import * as Types from '../types.generated';

export const updateActionMappingField = createAsyncThunk(
  'updateActionMappingField',
  async (variables: UpdateActionMappingFieldMutationVariables) => {
    return sendRequest<UpdateActionMappingFieldMutation>({
      variables,
      query: UpdateActionMappingFieldDocument,
    });
  },
);

const initialState: InitialStateType = {
  actionMappingField: undefined,
  status: undefined,
  error: undefined,
};

export const updateActionMappingFieldSlice = createSlice({
  name: 'updateActionMappingFieldSlice',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateActionMappingField.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateActionMappingField.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.actionMappingField= payload?.data?.updateActionMappingField;
        }
      })
      .addCase(updateActionMappingField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actionMappingField: Types.ActionMappingField | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type UpdateActionMappingFieldMutationVariables = Types.Exact<{
  actionMappingField: Types.ActionMappingFieldInput;
}>;

export type UpdateActionMappingFieldMutation = {
  __typename?: 'Mutation';
  updateActionMappingField?: {
    __typename?: 'ActionMappingField';
    id?: number | null;
    fieldValue?: string | null;
    label?: string | null;
    mapping?: string | null;
    exposeFieldInfo?: string | null;
    actionOutputFieldId?: number | null;
    autoFlowId?: number | null;
  } | null;
};

export const UpdateActionMappingFieldDocument = `
    mutation updateActionMappingField($actionMappingField: ActionMappingFieldInput!) {
  updateActionMappingField(actionMappingField: $actionMappingField) {
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

export const { resetStatus: resetUpdateActionMappingFieldStatus } = updateActionMappingFieldSlice.actions;
