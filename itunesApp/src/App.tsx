import React from 'react';
import {SafeAreaView} from 'react-native';
import {MainScreen} from 'screens';

function App(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-screen">
      <MainScreen />
    </SafeAreaView>
  );
}

export default App;
