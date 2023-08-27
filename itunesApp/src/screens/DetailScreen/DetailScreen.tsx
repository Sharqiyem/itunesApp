import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Heart} from 'icons';
import {DetailScreenRouteProp} from 'navigation/types';
import {getThemeColors} from 'utils';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'react-native-linear-gradient';
import {FAV_STORAGE_KEY} from 'config';
import {useAsyncStorage} from 'hooks';
import {Item} from 'types';

export const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const {isFavourited, saveToFavourite} =
    useAsyncStorage<Item>(FAV_STORAGE_KEY);

  const {label, image, price, id, tag} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const makeFavourite = () => {
    saveToFavourite({id, label, image, price});
  };

  return (
    <View className="flex-1 bg-screen">
      <StatusBar barStyle="light-content" />
      <View className=" bg-listItem w-full flex-1">
        <View className="w-full max-h-[300]">
          <LinearGradient
            end={{x: 1, y: 1}}
            start={{x: 1, y: 0}}
            className="absolute top-0 left-0 right-0 bottom-[200] z-10 flex-row justify-between p-3"
            colors={['rgba(0, 0, 0, 100)', 'rgba(0, 0, 0, 0)']}
            style={{paddingTop: top + 10}}>
            <TouchableOpacity onPress={goBack}>
              <Text className="text-white">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={makeFavourite}>
              <Heart
                color={
                  isFavourited(id)
                    ? (getThemeColors()?.primary as string)
                    : 'grey'
                }
              />
            </TouchableOpacity>
          </LinearGradient>

          <Animated.Image
            testID="img"
            accessibilityRole="image"
            source={{uri: image}}
            className="w-full h-full"
            sharedTransitionTag={id + tag}
          />
        </View>
        <View className="flex-1 p-2 gap-2">
          <Text
            numberOfLines={2}
            className="text-base text-black font-semibold">
            {label}
          </Text>
          <Text className="text-sm text-gray-600">{price}</Text>
        </View>
      </View>
    </View>
  );
};
