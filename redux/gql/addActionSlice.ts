import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";
import { addServiceSlice } from "./addServiceSlice";

export const addServiceAction = createAsyncThunk(
  "addServiceAction",
  async (variables: AddActionMutationVariables) => {
    return sendRequest<AddActionMutation>({
      variables,
      query: AddActionDocument,
    });
  }
);

const initialState: InitialStateType = {
  action: undefined,
  status: undefined,
  error: undefined,
};

export const addServiceActionSlice = createSlice({
  name: "addServiceActionSlice",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addServiceAction.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(addServiceAction.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.action = payload?.data?.addServiceAction;
        }
      })
      .addCase(addServiceAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  action: Types.ServiceAction | null | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type AddActionMutationVariables = Types.Exact<{
  action: Types.ServiceActionInput;
}>;

export type AddActionMutation = {
  __typename?: "Mutation";
  addServiceAction?: {
    __typename?: "ServiceAction";
    id?: number | null;
    name?: string | null;
    description?: string | null;
    endpointPath?: string | null;
    serviceApiId?: number | null;
  } | null;
};

export const AddActionDocument = `
    mutation addAction($action: ServiceActionInput!) {
  addServiceAction(serviceAction: $action) {
    id
    name
    description
    endpointPath
    serviceApiId
  }
}`;

export const { resetStatus } = addServiceSlice.actions;
