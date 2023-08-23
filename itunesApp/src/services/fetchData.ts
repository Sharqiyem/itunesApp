import {ApiItem} from 'types';
import axios from 'axios';

const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

export const fetchData = async (): Promise<ApiItem> => {
  const response = await axios.get(API_URL);
  return response.data;
};
