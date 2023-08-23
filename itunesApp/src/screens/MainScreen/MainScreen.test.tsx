/**
 * @format
 */

import 'react-native';
import React from 'react';
import {MainScreen} from './MainScreen';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';
import {render, screen} from '@testing-library/react-native';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';

// Note: test renderer must be required after react-native.

it('renders correctly', async () => {
  render(
    <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
      <MainScreen />
    </QueryProviderWrapper>,
  );
  const labelEl = await screen.findByText('Albums Searcher');
  const inputEl = await screen.findByPlaceholderText('Type album title');
  const iconEl = await screen.findByTestId('heartIcon');

  // screen.debug();
  expect(labelEl).toBeDefined();
  expect(inputEl).toBeDefined();
  expect(iconEl).toBeDefined();
  // expect(imagEl.props.source.uri).toEqual(item.image);
});
