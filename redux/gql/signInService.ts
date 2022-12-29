import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../types.generated";
import { sendRequest } from "../baseApi";

export type RegisterMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

export type RegisterMutation = { __typename?: "Mutation"; signIn: string };

export const RegisterDocument = `
mutation register($userInfo: UserInfoInput!) {
  signIn(userInfo: $userInfo)
}
`;

export const signIn = createAsyncThunk(
  "signIn",
  async (variables: RegisterMutationVariables) => {
    const res = await sendRequest({ query: RegisterDocument, variables });
    return res.data;
  }
);

const initialState: {
  token: string;
  status: string;
  error: string | undefined;
} = {
  token: "",
  status: "",
  error: "",
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.signIn;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
