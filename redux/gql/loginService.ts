import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

export type LoginMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

export const login = createAsyncThunk(
  "login",
  async (variables: LoginMutationVariables) => {
    const query = `
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }`;
    const res = await sendRequest({ query, variables });
    return res?.data;
  }
);

type InitStateType = {
  status: string;
  token: string | undefined;
  error: string | undefined;
};

const initState: InitStateType = { status: "", token: "", error: undefined };

export const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload?.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
