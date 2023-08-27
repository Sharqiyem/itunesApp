import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {useAsyncStorage} from 'hooks/useAsyncStorage';
import {Heart} from 'icons';
import {DetailNativeStackNavigationProp} from 'navigation/types';
import {Item, ItemWithTag} from 'types';
import {getThemeColors} from 'utils';
import {FAV_STORAGE_KEY} from 'config';

export const ListItem = ({id, label, image, price, tag}: ItemWithTag) => {
  const {isFavourited, saveToFavourite} =
    useAsyncStorage<Item>(FAV_STORAGE_KEY);

  const navigation = useNavigation<DetailNativeStackNavigationProp>();

  const openDetail = () => {
    navigation.push('Detail', {
      tag,
      id,
      label,
      image,
      price,
    });
  };

  const makeFavourite = () => {
    saveToFavourite({id, label, image, price});
  };

  return (
    <TouchableOpacity
      testID="openBtn"
      onPress={openDetail}
      className=" bg-listItem w-full min-h-[90] rounded-xl  overflow-hidden">
      <View className="w-full  max-h-[100]">
        <TouchableOpacity
          testID="heartBtn"
          onPress={makeFavourite}
          className="absolute top-1 right-1 z-10">
          <Heart
            color={
              isFavourited(id) ? (getThemeColors()?.primary as string) : 'grey'
            }
          />
        </TouchableOpacity>

        <Animated.Image
          testID="img"
          accessibilityRole="image"
          source={{uri: image}}
          className="w-full h-full"
          sharedTransitionTag={id + tag}
        />
      </View>
      <View className="flex-1 p-2 gap-2">
        <Text numberOfLines={2} className="text-base font-semibold">
          {label}
        </Text>
        <Text className="text-sm text-gray-600">{price}</Text>
      </View>
    </TouchableOpacity>
  );
};
