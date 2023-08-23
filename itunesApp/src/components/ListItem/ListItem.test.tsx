/**
 * @format
 */

import 'react-native';
import React from 'react';
import {ListItem} from './ListItem';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';
import {render, screen} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import {items} from 'data';

it('renders correctly', async () => {
  const item = items[0];
  render(<ListItem {...item} />);
  const labelEl = await screen.findByText(item.label);
  const priceEl = await screen.findByText(item.price);
  const imagEl = await screen.getByTestId('img');

  // screen.debug();
  expect(labelEl).toBeDefined();
  expect(priceEl).toBeDefined();
  expect(imagEl).toBeDefined();
  expect(imagEl.props.source.uri).toEqual(item.image);
});
