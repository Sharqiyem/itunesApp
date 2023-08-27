import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem, StyledList} from 'components';
import {Item} from 'types';
import {Close, MagnifyingGlass} from 'icons';
import {useAsyncStorage} from 'hooks/useAsyncStorage';
import {useDebounce} from 'hooks/useDebounce';
import {getThemeColors, filterData} from 'utils';
import {FAV_STORAGE_KEY} from 'config';

const Seperator = () => <View className="h-2" />;

export const FavouriteScreen = () => {
  const {data} = useAsyncStorage<Item>(FAV_STORAGE_KEY);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterdData, setFilterdData] = useState<Item[]>([]);
  const debouncedValue = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    const filteredItems = data?.data?.filter(filterData(debouncedValue));

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
    const {id, ...rest} = item;

    return (
      <View className="flex-1">
        <ListItem {...rest} id={id} tag="fav" />
      </View>
    );
  };

  const renderList = () => {
    return (
      <StyledList
        className="p-3"
        contentContainerStyle="pb-10"
        data={searchTerm === '' ? data?.data : filterdData}
        numColumns={2}
        horizontal={false}
        keyExtractor={item => item.label}
        renderItem={renderItem}
        ItemSeparatorComponent={Seperator}
        columnWrapperStyle={styles.row}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-screen">
      {renderSearchInput()}

      {renderList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    gap: 12,
    justifyContent: 'space-around',
  },
});
