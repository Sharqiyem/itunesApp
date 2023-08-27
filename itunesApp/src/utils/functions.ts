import {Item} from 'types';

export const filterData = (debouncedValue: string) => (item: Item) =>
  item.label.toLowerCase().includes(debouncedValue.toLowerCase());
