import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIResponse } from "../../types";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

export const getServiceById = createAsyncThunk(
  "getServiceById",
  async (
    variables: ServiceByIdQueryVariables
  ): Promise<APIResponse<ServiceByIdQuery>> => {
    return sendRequest<ServiceByIdQuery>({
      query: ServiceByIdDocument,
      variables,
    });
  }
);

const initialState: InitialStateType = {
  service: {},
  error: undefined,
  status: undefined,
};

export const getServiceByIdSlice = createSlice({
  name: "getServiceById",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceById.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.service = payload?.data?.service ?? {};
        }
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  service: any;
  error?: string;
  status?: string;
}

export type ServiceByIdQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export type ServiceByIdQuery = {
  __typename?: "Query";
  service: {
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
  };
};

export const ServiceByIdDocument = `
    query serviceById($serviceId: Int!) {
  service(id: $serviceId) {
    id
    name
    description
  }
}`;
