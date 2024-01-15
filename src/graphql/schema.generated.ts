// Code generated by graphql-codegen. DO NOT EDIT.

/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
import * as Types from "../types/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetLeadsQueryVariables = Types.Exact<{
  from?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  size?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  query?: Types.InputMaybe<Types.LeadQueryInput>;
  order?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.LeadOrderInput>>
    | Types.InputMaybe<Types.LeadOrderInput>
  >;
}>;

export type GetLeadsQuery = {
  leads?: {
    total: number;
    collection: Array<{
      id: string;
      stage?: Types.LeadStage | null;
      companyName?: string | null;
      leadSource?: string | null;
      dealAmount?: string | null;
    }>;
  } | null;
};

export const GetLeadsDocument = gql`
  query getLeads(
    $from: Int
    $size: Int
    $query: LeadQueryInput
    $order: [LeadOrderInput]
  ) {
    leads(from: $from, size: $size, query: $query, order: $order) {
      total
      collection {
        id
        stage
        companyName
        leadSource
        dealAmount
      }
    }
  }
`;

/**
 * __useGetLeadsQuery__
 *
 * To run a query within a React component, call `useGetLeadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeadsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      size: // value for 'size'
 *      query: // value for 'query'
 *      order: // value for 'order'
 *   },
 * });
 */
export const useGetLeadsQuery = (
  baseOptions?: Apollo.QueryHookOptions<GetLeadsQuery, GetLeadsQueryVariables>,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLeadsQuery, GetLeadsQueryVariables>(
    GetLeadsDocument,
    options,
  );
};
export const useGetLeadsLazyQuery = (
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLeadsQuery,
    GetLeadsQueryVariables
  >,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLeadsQuery, GetLeadsQueryVariables>(
    GetLeadsDocument,
    options,
  );
};
export const useGetLeadsSuspenseQuery = (
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetLeadsQuery,
    GetLeadsQueryVariables
  >,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetLeadsQuery, GetLeadsQueryVariables>(
    GetLeadsDocument,
    options,
  );
};
export type GetLeadsQueryHookResult = ReturnType<typeof useGetLeadsQuery>;
export type GetLeadsLazyQueryHookResult = ReturnType<
  typeof useGetLeadsLazyQuery
>;
export type GetLeadsSuspenseQueryHookResult = ReturnType<
  typeof useGetLeadsSuspenseQuery
>;
export type GetLeadsQueryResult = Apollo.QueryResult<
  GetLeadsQuery,
  GetLeadsQueryVariables
>;
