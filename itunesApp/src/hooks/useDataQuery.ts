import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {fetchData} from 'services';
import {Entry} from 'types';

export const useDataQuery = () => {
  const queryInfo = useQuery({queryKey: ['data'], queryFn: fetchData});

  return {
    ...queryInfo,

    data: useMemo(
      () =>
        queryInfo?.data?.feed?.entry.map((item: Entry) => ({
          id: item.id.attributes['im:id'],
          label: item.title.label,
          image: item['im:image'][item['im:image'].length - 1].label,
          price: item['im:price'].label,
        })),
      [queryInfo?.data],
    ),
  };
};
