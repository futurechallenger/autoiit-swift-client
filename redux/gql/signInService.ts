import * as Types from '../types.generated';

import { api } from '../baseApi';
export type RegisterMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', signIn: string };


export const RegisterDocument = `
    mutation register($userInfo: UserInfoInput!) {
  signIn(userInfo: $userInfo)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  // overrideExisting: module.hot?.status() === "apply",
  endpoints: (build) => ({
    register: build.mutation<RegisterMutation, RegisterMutationVariables>({
      query: (variables) => ({ document: RegisterDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useRegisterMutation } = injectedRtkApi;

