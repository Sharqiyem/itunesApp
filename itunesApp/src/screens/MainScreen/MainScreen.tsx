import React, {useState} from 'react';
import {
  FlatList as RNFlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListItem} from 'components';
import {items} from 'data';
import {Item} from 'types';
import {styled} from 'nativewind';
import {Heart} from 'icons';
import {MagnifyingGlass} from 'icons/MagnifyingGlass';

const Seperator = () => <View className="h-2" />;

export const FlatList = styled(RNFlatList as new () => RNFlatList, {
  props: {
    contentContainerStyle: true,
    columnWrapperStyle: true,
  },
});

export const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderSearchInput = () => {
    return (
      <View className="mx-3">
        <View className="absolute top-3 left-3">
          <MagnifyingGlass />
        </View>
        <TextInput
          testID="searchinput"
          className="px-10 h-10 rounded-full bg-input"
          placeholder="Type album title"
          value={searchTerm}
          onChangeText={text => {
            setSearchTerm(text);
          }}
        />
        {searchTerm !== '' ? (
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={() => {
              setSearchTerm('');
            }}>
            <Text className="font-bold">X</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View className="flex-1">
        <ListItem {...item} />
      </View>
    );
  };

  return (
    <View className="flex-1 ">
      {/* Header */}
      <View className="my-3 flex-row justify-between px-3 items-center">
        <View>
          <Text className="text-2xl font-bold text-black dark:text-white">
            Albums Searcher
          </Text>
        </View>
        <View className="">
          <Heart />
        </View>
      </View>
      {renderSearchInput()}

      <FlatList
        className="p-3"
        contentContainerStyle="pb-10"
        data={items}
        numColumns={2}
        horizontal={false}
        keyExtractor={item => item.label}
        renderItem={renderItem}
        ItemSeparatorComponent={Seperator}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    gap: 12,
    justifyContent: 'space-around',
  },
});
