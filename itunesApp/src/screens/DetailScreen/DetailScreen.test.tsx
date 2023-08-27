/**
 * @format
 */

import 'react-native';
import React from 'react';
import {DetailScreen} from './DetailScreen';

import {it} from '@jest/globals';
import {render, screen, waitFor} from '@testing-library/react-native';
import {items} from '../../data';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';

const item = items[0];

describe('<DetailScreen />', () => {
  it('renders correctly', async () => {
    const mockUseRoute = jest.spyOn(
      require('@react-navigation/native'),
      'useRoute',
    );

    mockUseRoute.mockImplementation(() => ({
      params: {
        ...item,
      },
    }));

    render(
      <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
        <DetailScreen />
      </QueryProviderWrapper>,
    );

    await waitFor(async () => {
      const labelEl = await screen.findByText(item.label);
      const priceEl = await screen.findByText(item.price);
      const imagEl = await screen.getByTestId('img');

      // screen.debug();
      expect(labelEl).toBeDefined();
      expect(priceEl).toBeDefined();
      expect(imagEl).toBeDefined();
      expect(imagEl.props.source.uri).toEqual(item.image);
      expect(mockUseRoute).toHaveBeenCalled();
    });
  });
});
