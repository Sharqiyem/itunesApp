import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery, useQueryClient} from 'react-query';

export function useAsyncStorage<T extends {id: string}>(key: string) {
  // const [, setStorageItem] = useState<T[]>([]);
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: Infinity,
    },
  });

  const storedData = useQuery<T[]>({
    queryKey: [key],
    queryFn: () => [],
  });

  async function getStorageItem() {
    const dataStr = await AsyncStorage.getItem(key);
    if (dataStr) {
      const data: T[] = JSON.parse(dataStr);
      queryClient.setQueryData([key], () => data);
    }
  }

  function updateStorageItem(data: T[]) {
    const dataStr: string = JSON.stringify(data);
    AsyncStorage.setItem(key, dataStr);
    queryClient.setQueryData([key], () => data);
    return data;
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    queryClient.setQueryData([key], () => []);
  }

  useEffect(() => {
    getStorageItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFavourited = (id: string) =>
    storedData?.data?.findIndex(s => s.id === id) !== -1;

  const saveToFavourite = (item: T) => {
    if (!isFavourited(item.id) && storedData.data) {
      const saved = [...storedData.data];
      saved.unshift(item);
      updateStorageItem(saved);
    } else {
      const newData = storedData?.data?.filter(s => s.id !== item.id);
      if (newData) {
        updateStorageItem(newData);
      }
    }
  };

  return {
    data: storedData,
    updateStorageItem,
    clearStorageItem,
    saveToFavourite,
    isFavourited,
  };
}
