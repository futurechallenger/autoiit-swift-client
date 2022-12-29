import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

const getServiceInfo = createAsyncThunk(
  "serviceInfo",
  async (variables: GetServicesQueryVariables): Promise<GetServicesQuery> => {
    const query=`query getServices($type: String!) {
      servicesByType(serviceType: $type) {
        id
        name
        description
      }
    }`
    const res = await sendRequest({query, variables});
    return res.data;
  }
);

const initialState: {
  services: Array<any> ,
  error: string|undefined,
  status: string;
} = {
  services:[],
  error: undefined,
  status: '',
}

export const serviceInfoSlice = createSlice({
  name: "serviceInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServiceInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getServiceInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services.push(action.payload);
      })
      .addCase(getServiceInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export type GetServiceQueryVariables = Types.Exact<{
  serviceId: Types.Scalars["Int"];
}>;

export type GetServiceQuery = {
  __typename?: "Query";
  service: {
    __typename?: "Service";
    id: number;
    name: string;
    description?: string | null;
  };
};

export const GetServiceDocument = `
  query getService($serviceId: Int!) {
    service(id: $serviceId) {
      id
      name
      description
    }
  }
`;

export type GetServicesQueryVariables = Types.Exact<{
  type: Types.Scalars["String"];
}>;

export type ServiceInfo = {
  __typename?: "Service";
  id: number;
  name: string;
};

export type GetServicesQuery = {
  __typename?: "Query";
  servicesByType?: Array<ServiceInfo> | null;
};

// export const GetServicesDocument = `
//     query getServices($type: String!) {
//   servicesByType(serviceType: $type) {
//     id
//     name
//   }
// }
// `;

// const injectedRtkApi = api.injectEndpoints({
//   // overrideExisting: module.hot?.status() === "apply",
//   endpoints: (build) => ({
//     getService: build.query<GetServiceQuery, GetServiceQueryVariables>({
//       query: (variables) => ({ document: GetServiceDocument, variables }),
//     }),
//     getServices: build.query<GetServicesQuery, GetServicesQueryVariables>({
//       query: (variables) => ({ document: GetServicesDocument, variables }),
//     }),
//   }),
// });

// export { injectedRtkApi as api };
// export const {
//   useGetServiceQuery,
//   useLazyGetServiceQuery,
//   useGetServicesQuery,
//   useLazyGetServicesQuery,
// } = injectedRtkApi;
