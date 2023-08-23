export interface Item {
  label: string;
  price: string;
  image: string;
}

export interface ApiItem {
  feed: {
    entry: Entry[];
  };
}

export interface Entry {
  'im:image': ImImage[];
  'im:price': ImPrice;
  title: Title;
}
export interface ImImage {
  label: string;
}

export interface ImPrice {
  label: string;
}

export interface Title {
  label: string;
}
