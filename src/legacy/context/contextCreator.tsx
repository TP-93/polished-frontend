// @ts-nocheck
import React, { useReducer } from 'react';

interface StateProviderInterface {
  reducer: (state: any, action: { type: string; payload?: any }) => any;
  initialState: Record<string, any>;
  children: JSX.Element[] | JSX.Element;
}

// context provider factory
export default (context: React.Context<any>) =>
  ({ reducer, initialState, children }: StateProviderInterface) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <context.Provider value={{ state, dispatch }}>
        {children}
      </context.Provider>
    );
  };
