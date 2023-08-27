import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RootNavigation} from 'navigation';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
