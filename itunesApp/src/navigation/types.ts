import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ItemWithTag} from 'types';

export type RootParamList = {
  Main: undefined;
  Detail: ItemWithTag;
  Favourite: undefined;
};

// NavigationProps

export type DetailNativeStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'Detail'
>;

export type FavouriteNativeStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'Favourite'
>;

// RouteProps
export type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;
