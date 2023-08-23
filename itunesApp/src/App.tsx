import React from 'react';
import {SafeAreaView} from 'react-native';
import {MainScreen} from 'screens';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-screen">
        <MainScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
