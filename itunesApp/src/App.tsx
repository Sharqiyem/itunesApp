import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {ListItem} from 'components';

function App(): JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-blue-500 dark:text-white">Hello</Text>
        <ListItem />
      </View>
    </SafeAreaView>
  );
}

export default App;
