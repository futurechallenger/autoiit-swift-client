import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIResponse } from "../../types";
import { sendRequest } from "../baseApi";

export const getServicesByUserId = createAsyncThunk(
  "getServicesByUserId",
  async (
  ): Promise<APIResponse<ServicesByUserIdQuery>> => {
    return sendRequest<ServicesByUserIdQuery>({
      query: ServicesByUserIdDocument,
      variables: undefined
    });
  }
);
const initialState: InitialStateType = {
  services: [],
  error: undefined,
  status: undefined,
};

export const getServicesByUserIdSlice = createSlice({
  name: "ServicesByUserIdSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServicesByUserId.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getServicesByUserId.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.services = payload?.data?.servicesByUserId ?? [];
        }
      })
      .addCase(getServicesByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

interface InitialStateType {
  services: Array<any>;
  error: string | undefined;
  status: string | undefined;
}

// export type ServicesByUserIdQueryVariables = Types.Exact<{
//   userId: Types.Scalars["Int"];
// }>;

export type ServicesByUserIdQuery = {
  __typename?: "Query";
  servicesByUserId?: Array<{
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
    connected?: boolean | null;
  }> | null;
};

export const ServicesByUserIdDocument = `
    query servicesByUserId {
  servicesByUserId {
    id
    name
    description
    connected
  }
}
`;
