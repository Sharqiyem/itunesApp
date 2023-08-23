import {Heart} from 'icons';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Item} from 'types';
import {getThemeColors} from 'utils';

export const ListItem = ({label, image, price}: Item) => {
  return (
    <View className=" bg-listItem w-full min-h-[90] rounded-xl  overflow-hidden">
      <View className="w-full  max-h-[100]">
        <TouchableOpacity className="absolute top-1 right-1 z-10">
          <Heart color={getThemeColors()?.primary as string} />
        </TouchableOpacity>
        <Image
          testID="img"
          accessibilityRole="image"
          source={{uri: image}}
          className="w-full h-full"
        />
      </View>
      <View className="flex-1 p-2 gap-2">
        <Text numberOfLines={2} className="text-base font-semibold">
          {label}
        </Text>
        <Text className="text-sm text-gray-600">{price}</Text>
      </View>
    </View>
  );
};
