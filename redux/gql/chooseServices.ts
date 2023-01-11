import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";

import * as Types from "../types.generated";

export const chooseService = createAsyncThunk("chooseService", async () => {
  return sendRequest<ChooseServicesQuery>({
    query: ChooseServicesDocument,
    variables: undefined,
  });
});

const initialState: InitialStateType = {
  services: [],
  error: undefined,
  status: "",
};

export const chooseServiceSlice = createSlice({
  name: "chooseServiceSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(chooseService.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(chooseService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.services = payload?.data?.services ?? [];
        }
      })
      .addCase(chooseService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  services: Array<any>;
  error: string | undefined;
  status: string;
}

export type ChooseServicesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ChooseServicesQuery = {
  __typename?: "Query";
  services: Array<{
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
  }>;
};

export const ChooseServicesDocument = `query ChooseServices {
  services {
    id
    name
    description
  }
}`;
