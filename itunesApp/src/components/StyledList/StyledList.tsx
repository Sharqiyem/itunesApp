import {styled} from 'nativewind';
import {FlatList as RNFlatList} from 'react-native';

export const StyledList = styled(RNFlatList as new () => RNFlatList, {
  props: {
    contentContainerStyle: true,
    columnWrapperStyle: true,
  },
});
