import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen, FavouriteScreen, DetailScreen} from 'screens';
import {RootParamList} from './types';

const Stack = createNativeStackNavigator<RootParamList>();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
