import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Types from '../types.generated';
import { sendRequest } from '../baseApi';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from '@/lib/config';

export type RegisterMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

export type SignInReturnType = {
  signIn: string;
};

export type LoginMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

type LoginReturnType = {
  loginIn: string;
};

export type RegisterMutation = { __typename?: 'Mutation'; signIn: string };

export const RegisterDocument = `
mutation register($userInfo: UserInfoInput!) {
  signIn(userInfo: $userInfo)
}
`;

export const login = createAsyncThunk('auth/login', async (variables: LoginMutationVariables) => {
  const query = `
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }`;

  const ret = await sendRequest<LoginReturnType>({ query, variables });
  const token = ret?.data?.loginIn;
  if (!token) {
    throw new Error('Username or password is incorrect');
  }
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, ret.data.loginIn);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, ret.data.loginIn);
  }

  return ret;
});

export const signIn = createAsyncThunk('auth/signIn', async (variables: RegisterMutationVariables) => {
  const signInRet = await sendRequest<SignInReturnType>({
    query: RegisterDocument,
    variables,
  });

  const token = signInRet?.data?.signIn;
  if (!token) {
    throw new Error('Username or password is incorrect');
  }

  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, signInRet.data.signIn);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, signInRet.data.signIn);
  }

  return signInRet;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
});

export interface SignServiceResult {
  token: SignInReturnType;
  isAuthenticated: boolean;
  status: string;
  error: string;
}

const initialState: {
  token: string | undefined;
  isAuthenticated: boolean;
  status: string;
  error: string | undefined;
} = {
  isAuthenticated: false,
  token: undefined,
  status: '',
  error: '',
};

export const signInSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          state.status = 'failed';
          state.error = payload?.errors?.[0]?.message;
          state.isAuthenticated = false;
        } else {
          state.status = 'succeeded';
          state.token = payload.data?.signIn;
          state.isAuthenticated = true;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
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
          state.isAuthenticated = false;
        } else {
          state.status = 'succeeded';
          state.token = payload?.data.loginIn;
          state.isAuthenticated = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(signOut.pending, (state, action) => {
        console.log('signIn slice > pending');
        state.status = 'loading';
        if (state.error) {
          state.error = undefined;
        }
      })
      .addCase(signOut.rejected, (state, action) => {
        console.log('signIn slice > rejected');
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        console.log('signIn slice | fulfilled');

        state.status = 'succeeded';
        state.token = undefined;
        state.isAuthenticated = false;
      });
  },
});

export const { clearToken } = signInSlice.actions;
