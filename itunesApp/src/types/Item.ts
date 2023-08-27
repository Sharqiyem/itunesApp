export interface Item {
  id: string;
  label: string;
  price: string;
  image: string;
}

export interface ItemWithTag extends Item {
  tag: string;
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
  id: {
    attributes: {
      'im:id': string;
    };
  };
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
