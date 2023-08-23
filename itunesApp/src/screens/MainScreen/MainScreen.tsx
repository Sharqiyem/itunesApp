import React, {useEffect, useState} from 'react';
import {
  FlatList as RNFlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListItem} from 'components';
import {Item} from 'types';
import {styled} from 'nativewind';
import {Close, Heart, MagnifyingGlass} from 'icons';
import {useDataQuery, useDebounce} from 'hooks';
import {getThemeColors} from 'utils';

const Seperator = () => <View className="h-2" />;

export const FlatList = styled(RNFlatList as new () => RNFlatList, {
  props: {
    contentContainerStyle: true,
    columnWrapperStyle: true,
  },
});

export const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {isLoading, error, isSuccess, data} = useDataQuery();
  const [filterdData, setFilterdData] = useState<Item[]>([]);
  const debouncedValue = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    const filteredItems = data?.filter(item =>
      item.label.includes(debouncedValue),
    );
    if (filteredItems) {
      setFilterdData(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
            className="absolute top-3 right-3 "
            onPress={() => {
              setSearchTerm('');
            }}>
            <Close color={getThemeColors()?.gray['500'] as string} />
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

  const renderList = () => {
    if (isLoading) {
      return <Text className="text-center mt-3">Loading</Text>;
    }
    if (error) {
      return (
        <Text className="text-center mt-3">
          {(error as {message: string}).message}
        </Text>
      );
    }

    if (isSuccess) {
      return (
        <FlatList
          className="p-3"
          contentContainerStyle="pb-10"
          data={searchTerm === '' ? data : filterdData}
          numColumns={2}
          horizontal={false}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          ItemSeparatorComponent={Seperator}
          columnWrapperStyle={styles.row}
        />
      );
    }
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
          <Heart testID="heartIcon" />
        </View>
      </View>
      {renderSearchInput()}

      {renderList()}
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
