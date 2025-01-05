import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIResponse } from "../../types";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

export const updateService = createAsyncThunk(
  "updateService",
  async (variables: UpdateServiceMutationVariables) => {
    return sendRequest<UpdateServiceMutation>({
      variables,
      query: UpdateServiceDocument,
    });
  }
);

const initialState: InitialStateType = {
  service: {},
  error: undefined,
  status: undefined,
};

export const updateServiceSlice = createSlice({
  name: "getServiceById",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateService.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.service = payload?.data?.updateService ?? {};
        }
      })
      .addCase(updateService.rejected, (state, action) => {
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

export type UpdateServiceMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"];
  name: Types.Scalars["String"];
  desc?: Types.InputMaybe<Types.Scalars["String"]>;
  searchItems?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type UpdateServiceMutation = {
  __typename?: "Mutation";
  updateService: {
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
    connected?: boolean | null;
    searchItems?: Array<string> | null;
  };
};

export const UpdateServiceDocument = `
    mutation updateService($id: Int!, $name: String!, $desc: String, $searchItems: String) {
  updateService(
    id: $id
    name: $name
    description: $desc
    searchItems: $searchItems
  ) {
    id
    name
    description
    connected
    searchItems
  }
}`;
