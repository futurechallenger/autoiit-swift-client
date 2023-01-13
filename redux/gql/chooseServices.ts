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

let cachedServices: any[] = [];

export const chooseServiceSlice = createSlice({
  name: "chooseServiceSlice",
  initialState,
  reducers: {
    searchByName(state, action) {
      if (action.payload) {
        state.services = state.services.filter(
          (item) => item.name.indexOf(action.payload) >= 0
        );
      } else {
        state.services = cachedServices;
      }
    },
  },
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
          cachedServices = payload?.data?.services ?? [];
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

export type ServiceInfo = {
  __typename?: "Service";
  id: number;
  name: string;
  description?: string | null;
};

export type ChooseServicesQuery = {
  __typename?: "Query";
  services: Array<ServiceInfo>;
};

export const ChooseServicesDocument = `query ChooseServices {
  services {
    id
    name
    description
  }
}`;
