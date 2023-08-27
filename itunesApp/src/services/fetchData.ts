import {ApiItem} from 'types';
import axios from 'axios';
import {API_URL} from 'config';

export const fetchData = async (): Promise<ApiItem> => {
  // console.log('fetchData-', API_URL);
  const response = await axios.get(API_URL);

  return response.data;
};
