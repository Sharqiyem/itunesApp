import 'react-native';
import React from 'react';
import {FavouriteScreen} from './FavouriteScreen';

import {it} from '@jest/globals';
import {render, screen, waitFor} from '@testing-library/react-native';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';

describe('<FavouriteScreen />', () => {
  it('renders correctly', async () => {
    render(
      <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
        <FavouriteScreen />
      </QueryProviderWrapper>,
    );
    await waitFor(() => {
      const labelEl = screen.findByText('Favourites');
      const inputEl = screen.findByPlaceholderText('Type album title');

      expect(labelEl).toBeDefined();
      expect(inputEl).toBeDefined();
    });
  });
});
