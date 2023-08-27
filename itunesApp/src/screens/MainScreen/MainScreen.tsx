import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListItem, StyledList} from 'components';
import {Item} from 'types';
import {Close, Heart, MagnifyingGlass} from 'icons';
import {useDataQuery} from 'hooks/useDataQuery';
import {useDebounce} from 'hooks/useDebounce';
import {getThemeColors, filterData} from 'utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {FavouriteNativeStackNavigationProp} from 'navigation/types';

const Seperator = () => <View className="h-2" />;

export const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {isLoading, error, isSuccess, isRefetching, data, refetch} =
    useDataQuery();
  const [filterdData, setFilterdData] = useState<Item[]>([]);
  const debouncedValue = useDebounce<string>(searchTerm, 1000);
  const navigation = useNavigation<FavouriteNativeStackNavigationProp>();

  useEffect(() => {
    const filteredItems = data?.filter(filterData(debouncedValue));
    if (filteredItems) {
      setFilterdData(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const onRefresh = () => {
    refetch?.();
  };

  const openFavourite = () => {
    navigation.navigate('Favourite');
  };

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
        <ListItem {...rest} id={id} tag="main" />
      </View>
    );
  };

  const renderList = () => {
    if (isLoading) {
      return <Text className="text-center mt-3">Loading...</Text>;
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
        <StyledList
          testID="mainList"
          className="p-3"
          contentContainerStyle="pb-10"
          data={searchTerm === '' ? data : filterdData}
          numColumns={2}
          horizontal={false}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          ItemSeparatorComponent={Seperator}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }
        />
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-screen">
      {/* Header */}
      <View className="my-3 flex-row justify-between px-3 items-center">
        <View>
          <Text className="text-2xl font-bold text-black dark:text-white">
            Albums Searcher
          </Text>
        </View>
        <TouchableOpacity onPress={openFavourite} className="">
          <Heart testID="heartIcon" />
        </TouchableOpacity>
      </View>

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
