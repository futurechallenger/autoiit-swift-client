import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { sendRequest } from '../baseApi';
import { Platform } from 'react-native';
import { TOKEN_KEY } from '@/lib/config';
import * as Types from '../types.generated';

export type LoginMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

type LoginReturnType = {
  loginIn: string;
};

export const login = createAsyncThunk('login', async (variables: LoginMutationVariables) => {
  const query = `
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }`;
  const ret = await sendRequest<LoginReturnType>({ query, variables });
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, ret.data.loginIn);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, ret.data.loginIn);
  }

  return ret;
});

type InitStateType = {
  status: string;
  token: LoginReturnType | undefined;
  error: string | undefined;
};

const initState: InitStateType = {
  status: '',
  token: undefined,
  error: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initState,
  reducers: {
    clearToken: (state) => {
      state.token = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload?.errors?.[0]?.message;
        } else {
          state.status = 'succeeded';
          state.token = payload?.data;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearToken } = loginSlice.actions;
