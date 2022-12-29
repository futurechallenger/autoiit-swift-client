import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Types from "../types.generated";

import { sendRequest } from "../baseApi";

export const getUserInfo = createAsyncThunk(
  "userInfo",
  async (variables: FindUserQueryVariables) => {
    const res = await sendRequest({ query: FindUserDocument, variables });
    return res?.data;
  }
);

const initialState: {
  userInfo: any;
  status: string;
  error: string | undefined;
} = {
  userInfo: {},
  status: "",
  error: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export type FindUserQueryVariables = Types.Exact<{
  email: Types.Scalars["String"];
}>;

export type FindUserQuery = {
  __typename?: "Query";
  userinfo?: { __typename?: "UserInfo"; name?: string | null } | null;
};

export const FindUserDocument = `
query findUser($email: String!) {
  userinfo(email: $email) {
    name
  }
}
`;
