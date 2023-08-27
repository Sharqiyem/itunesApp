import React, {ReactElement} from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from 'react-query';
export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const QueryProviderWrapper = ({
  children,
  cleanQueryClient,
}: {
  children: ReactElement;
  cleanQueryClient: QueryClient;
}): ReactElement<QueryClientProviderProps> => {
  return (
    <QueryClientProvider client={cleanQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
