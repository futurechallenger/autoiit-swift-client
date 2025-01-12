import { loginSlice } from './loginSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import * as Types from '../types.generated';
import { sendRequest } from '../baseApi';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export type RegisterMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

export type SignInReturnType = {
  signIn: string;
};

export type RegisterMutation = { __typename?: 'Mutation'; signIn: string };

export const RegisterDocument = `
mutation register($userInfo: UserInfoInput!) {
  signIn(userInfo: $userInfo)
}
`;

export const signIn = createAsyncThunk('signIn', async (variables: RegisterMutationVariables) => {
  return sendRequest<SignInReturnType>({
    query: RegisterDocument,
    variables,
  });
});

export interface SignServiceResult {
  token: SignInReturnType;
  status: string;
  error: string;
}

const initialState: {
  token: SignInReturnType | undefined;
  status: string;
  error: string | undefined;
} = {
  token: undefined,
  status: '',
  error: '',
};

export const signInSlice = createSlice({
  name: 'signIn',
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
        } else {
          state.status = 'succeeded';
          state.token = payload.data;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const removeTokenInitialState: { error: string | undefined; status: string | undefined } = {
  error: undefined,
  status: undefined,
};
/**
 * Sign out or logout by remove token from local storage
 */
export const removeToken = createAsyncThunk('removeToken', async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('token');
  } else {
    await SecureStore.deleteItemAsync('token');
  }
});

export const removeTokenSlice = createSlice({
  name: 'signOut',
  initialState: removeTokenInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(removeToken.pending, (state, action) => {
        state.status = 'loading';
        if (state.error) {
          state.error = '';
        }
      })
      .addCase(removeToken.fulfilled, (state, action) => {
        state.error = '';
        state.status = 'succeeded';
      })
      .addCase(removeToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearToken } = signInSlice.actions;
