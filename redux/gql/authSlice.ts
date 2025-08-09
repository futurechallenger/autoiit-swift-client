import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Types from '../types.generated';
import { sendRequest } from '../baseApi';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from '@/lib/config';

export type RegisterMutationVariables = Types.Exact<{
  username: Types.Maybe<Types.Scalars['String']>;
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type SignInReturnType = {
  register: {
    token: string;
  }
};

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

type LoginReturnType = {
  loginIn: {
    token: string;
  };
};

export type RegisterMutation = { __typename?: 'Mutation'; signIn: string };

export const RegisterDocument = `
mutation Register($username: String, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
  }
}
`;

// signUp(username:String, email:String!, password: String!): TokenRes
export const login = createAsyncThunk('auth/login', async (variables: LoginMutationVariables) => {
  const query = `
  mutation Login($email:String!, $password: String!) {
    loginIn(email: $email, password: $password) {
      token
    }
  }`;

  const ret = await sendRequest<LoginReturnType>({ query, variables });
  const token = ret?.data?.loginIn?.token;
  if (!token) {
    throw new Error('Username or password is incorrect');
  }
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, ret.data.loginIn.token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, ret.data.loginIn.token);
  }

  return ret;
});

export const signIn = createAsyncThunk('auth/signIn', async (variables: RegisterMutationVariables) => {
  const signInRet = await sendRequest<SignInReturnType>({
    query: RegisterDocument,
    variables,
  });

  const token = signInRet?.data?.register.token;
  if (!token) {
    throw new Error('Username or password is incorrect');
  }

  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, signInRet.data.register.token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, signInRet.data.register.token);
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
          state.token = payload.data?.register.token;
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
          state.token = payload?.data.loginIn.token;
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
