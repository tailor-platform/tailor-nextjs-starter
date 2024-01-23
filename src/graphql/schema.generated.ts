// Code generated by graphql-codegen. DO NOT EDIT.

/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
import * as Types from "../types/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type TasksQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TasksQuery = {
  tasks: {
    collection: Array<{
      id: string;
      name: string;
      description: string;
      startAt?: string | null;
      endAt?: string | null;
    }>;
  };
};

export const TasksDocument = gql`
  query tasks {
    tasks {
      collection {
        id
        name
        description
        startAt
        endAt
      }
    }
  }
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export const useTasksQuery = (
  baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
};
export const useTasksLazyQuery = (
  baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
};
export const useTasksSuspenseQuery = (
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TasksQuery,
    TasksQueryVariables
  >,
) => {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
};
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<
  typeof useTasksSuspenseQuery
>;
export type TasksQueryResult = Apollo.QueryResult<
  TasksQuery,
  TasksQueryVariables
>;
