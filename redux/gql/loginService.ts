import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../baseApi";
import * as Types from "../types.generated";

export type LoginMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

type LoginReturnType = {
  login: string;
};

export const login = createAsyncThunk(
  "login",
  async (variables: LoginMutationVariables) => {
    const query = `
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }`;
    return sendRequest<LoginReturnType>({ query, variables });
  }
);

type InitStateType = {
  status: string;
  token: LoginReturnType | undefined;
  error: string | undefined;
};

const initState: InitStateType = {
  status: "",
  token: undefined,
  error: undefined,
};

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
        const payload = action.payload;
        if (payload?.errors) {
          state.status = "failed";
          state.error = payload?.errors?.message;
        } else {
          state.status = "succeeded";
          state.token = payload?.data;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
