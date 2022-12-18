import * as Types from '../types.generated';

import { api } from '../baseApi';

module.hot?.accept();

export type LoginMutationVariables = Types.Exact<{
  userInfo: Types.UserInfoInput;
}>;

export type LoginMutation = { __typename?: 'Mutation', loginIn: string };


export const LoginDocument = `
    mutation login($userInfo: UserInfoInput!) {
  loginIn(userInfo: $userInfo)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (build) => ({
    login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useLoginMutation } = injectedRtkApi;

