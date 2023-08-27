import axios from 'axios';
// import {API_URL} from 'config';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});
jest.mock('@react-navigation/native-stack', () => {
  return {
    ...jest.requireActual('@react-navigation/native-stack'),
    createNativeStackNavigator: jest.fn(() => ({})),
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('axios');
export const mockedAxios = axios as jest.Mocked<typeof axios>;

export const mockedResponse = {
  feed: {
    entry: [
      {
        id: {attributes: {'im:id': '11'}},
        title: {label: 'label movie'},
        'im:image': [{label: '1.png'}],
        'im:price': {label: '$11.99'},
      },
    ],
  },
};

// BOTH MOCK work
// 1.
// mockedAxios.get.mockImplementation((url: string) => {
//   if (url === API_URL) {
//     return Promise.resolve({data: mockedResponse.data});
//   }
//   return Promise.resolve({data: {name: 'value from the api'}});
// });

// 2.
mockedAxios.get.mockResolvedValue({
  data: mockedResponse,
});

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
