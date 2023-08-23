/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';

// import {QueryClient, QueryClientProvider} from 'react-query';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';

describe('<App />', () => {
  afterEach(() => {
    defaultQueryClient.clear();
  });

  it('renders correctly', () => {
    render(
      <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
        <App />
      </QueryProviderWrapper>,
    );
  });
});
