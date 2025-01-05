import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";
import { ServiceInfo } from "./chooseServices";

export const getServiceFullInfo = createAsyncThunk(
  "getServiceFullInfo",
  async (variables: FlowsByServiceQueryVariables) => {
    return sendRequest<FlowsByServiceQuery>({
      query: FlowsByServiceDocument,
      variables,
    });
  }
);

const initialState: InitialStateType = {
  flows: [],
  service: undefined,
  triggers: [],
  error: undefined,
  status: "",
};

export const getServiceFullInfoSlice = createSlice({
  name: "getServiceFullInfoSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceFullInfo.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceFullInfo.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
          state.flows = [];
          state.service = undefined;
          state.triggers = [];
        } else {
          state.status = "succeeded";
          state.flows = payload?.data?.flows ?? [];
          state.service = payload?.data?.service;
          state.triggers = payload?.data?.triggers ?? [];
          state.error = undefined;
        }
      })
      .addCase(getServiceFullInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  flows: Array<any>;
  triggers: Array<any>;
  service: ServiceInfo | undefined;
  error: string | undefined;
  status: string;
}

export type FlowsByServiceQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export interface AutoFlowInfo {
  __typename?: "AutoFlow";
  id?: number | null;
  triggerId?: number | null;
  actionId?: number | null;
}

export type FlowsByServiceQuery = {
  __typename?: "Query";
  flows?: Array<AutoFlowInfo> | null;
  service: {
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
    connected?: boolean | null;
  };
  triggers?: Array<{
    __typename?: "ServiceTrigger";
    id?: number | null;
    name?: string | null;
    description?: string | null;
  }> | null;
};

export const FlowsByServiceDocument = `
query flowsByService($serviceId: Int!) {
  flows: flowsByService(serviceId: $serviceId) {
    id
    triggerId
    actionId
  }
  service: service(id: $serviceId) {
    id
    name
    description
    connected
  }
  triggers: triggers(serviceId: $serviceId) {
    id
    name
    description
  }
}
`;
