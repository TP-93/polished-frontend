// @ts-nocheck
// taken from https://github.com/mirumee/saleor-storefront/blob/master/src/core/mutations.tsx
// @ts-nocheck

import { Mutation, MutationFunction, MutationResult } from 'react-apollo';
import { DocumentNode, ApolloError, MutationUpdaterFn } from 'apollo-boost';

export interface TypedMutationInnerProps<TData, TVariables> {
  onError?: (error: ApolloError) => void;
  children: (
    mutateFunction: MutationFunction<TData, TVariables>,
    result: MutationResult<TData>,
  ) => JSX.Element | null;
  variables?: TVariables;
  onCompleted?: (data: TData) => void;
}

// eslint-disable-next-line import/prefer-default-export
export function TypedMutation<TData, TVariables>(
  mutation: DocumentNode,
  update?: MutationUpdaterFn<TData>,
) {
  return (props: TypedMutationInnerProps<TData, TVariables>) => {
    const { onError, children, variables, onCompleted } =
      props as JSX.LibraryManagedAttributes<typeof TypedMutation, typeof props>;

    return (
      <Mutation
        update={update}
        onError={onError}
        mutation={mutation}
        variables={variables}
        onCompleted={onCompleted}
      >
        {children}
      </Mutation>
    );
  };
}
