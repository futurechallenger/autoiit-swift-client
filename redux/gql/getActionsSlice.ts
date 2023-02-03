import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const getServiceActinos = createAsyncThunk(
  "getServiceActinos",
  async (variables: GetActionsByServiceIdQueryVariables) => {
    return sendRequest<GetActionsByServiceIdQuery>({
      variables,
      query: GetActionsByServiceIdDocument,
    });
  }
);

const initialState: InitialStateType = {
  actions: undefined,
  status: undefined,
  error: undefined,
};

export const getServiceActionsSlice = createSlice({
  name: "getServiceActionsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceActinos.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceActinos.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.actions = payload?.data?.actions ?? [];
        }
      })
      .addCase(getServiceActinos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  actions: Types.ServiceAction[] | undefined;
  status: string | undefined;
  error: string | undefined;
}

export type GetActionsByServiceIdQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export type GetActionsByServiceIdQuery = {
  __typename?: "Query";
  actions?: Array<{
    __typename?: "ServiceAction";
    id?: number | null;
    name?: string | null;
    description?: string | null;
    endpointPath?: string | null;
    serviceApiId?: number | null;
  }> | null;
};

export const GetActionsByServiceIdDocument = `
    query getActionsByServiceId($serviceId: Int!) {
  actions(serviceId: $serviceId) {
    id
    name
    description
    endpointPath
    serviceApiId
  }
}
`;
