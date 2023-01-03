import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIResponse } from "../../types";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

export const exploreService = createAsyncThunk(
  "exploreServices",
  async (
    variables: SearchServicesQueryVariables
  ): Promise<APIResponse<SearchServicesQuery>> => {
    return sendRequest<SearchServicesQuery>({
      query: SearchServicesDocument,
      variables,
    });
  }
);

export const getMostSearchedServices = createAsyncThunk(
  "mostSearchedServices",
  async (): Promise<APIResponse<MostSearchedServicesQuery>> => {
    const variables: MostSearchedServicesQueryVariables = {
    };
    return sendRequest<MostSearchedServicesQuery>({
      query: MostSearchedServicesDocument,
      variables,
    });
  }
);

interface InitialStateType {
  services: Array<any>;
  error: string | undefined;
  status: string;
}

const initialState: InitialStateType = {
  services: [],
  error: undefined,
  status: "",
};

export const searchServiceSlice = createSlice({
  name: "exploreServices",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(exploreService.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(exploreService.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.services = payload?.data?.searchServices ?? [];
        }
      })
      .addCase(exploreService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const mostSearchedInitState: InitialStateType = {
  services: [],
  error: undefined,
  status: "",
};

export const mostSearchedServicesSlice = createSlice({
  name: "mostSearchedServicesSlice",
  initialState: mostSearchedInitState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMostSearchedServices.pending, (state, action) => {
        state.status = "loading";
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(getMostSearchedServices.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload.errors?.[0]?.message;
        } else {
          state.status = "succeeded";
          state.services = payload?.data?.mostSearchServices ?? [];
        }
      })
      .addCase(getMostSearchedServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export type SearchServicesQueryVariables = Types.Exact<{
  sinceId?: Types.InputMaybe<Types.Scalars["Int"]>;
  untilId?: Types.InputMaybe<Types.Scalars["Int"]>;
  count: Types.Scalars["Int"];
  name: Types.Scalars["String"];
}>;

export type SearchServicesQuery = {
  __typename?: "Query";
  searchServices?: Array<{
    __typename?: "Service";
    id: number;
    name: string;
  }> | null;
};

export const SearchServicesDocument = `
query searchServices($sinceId: Int, $untilId: Int, $count: Int!, $name: String!) {
  searchServices(
    untilId: $untilId
    sinceId: $sinceId
    requestCount: $count
    name: $name
  ) {
    id
    name
  }
}
`;

export type MostSearchedServicesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type MostSearchedServicesQuery = {
  __typename?: "Query";
  mostSearchServices?: Array<{
    __typename?: "MostSearchedServiceType";
    id: number;
    serviceType?: string | null;
  }> | null;
};

export const MostSearchedServicesDocument = `
    query mostSearchedServices {
  mostSearchServices {
    id
    serviceType
  }
}`;
