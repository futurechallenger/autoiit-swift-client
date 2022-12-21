import * as Types from '../types.generated';

import { api } from '../baseApi';

export type FindUserQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', userinfo?: { __typename?: 'UserInfo', name?: string | null } | null };


export const FindUserDocument = `
    query findUser($email: String!) {
  userinfo(email: $email) {
    name
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  // overrideExisting: module.hot?.status() === "apply",
  endpoints: (build) => ({
    findUser: build.query<FindUserQuery, FindUserQueryVariables>({
      query: (variables) => ({ document: FindUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useFindUserQuery, useLazyFindUserQuery } = injectedRtkApi;

