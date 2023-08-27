import 'react-native';
import React from 'react';
import {ListItem} from './ListItem';

import {it, expect} from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {items} from '../../data';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAV_STORAGE_KEY} from 'config';

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
      push: mockedNavigation,
    }),
  };
});

const item = items[0];

it('renders correctly', async () => {
  render(
    <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
      <ListItem {...item} tag="test" />
    </QueryProviderWrapper>,
  );

  const labelEl = await screen.findByText(item.label);
  const priceEl = await screen.findByText(item.price);
  const imagEl = await screen.getByTestId('img');

  expect(labelEl).toBeDefined();
  expect(priceEl).toBeDefined();
  expect(imagEl).toBeDefined();
  expect(imagEl.props.source.uri).toEqual(item.image);
});

it('must navigate on click', async () => {
  render(
    <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
      <ListItem {...item} tag="test" />
    </QueryProviderWrapper>,
  );

  await act(async () => {
    fireEvent.press(screen.getByTestId('openBtn'));
    await waitFor(() => {
      expect(mockedNavigation).toHaveBeenCalledWith('Detail', {
        id: item.id,
        label: item.label,
        image: item.image,
        price: item.price,
        tag: 'test',
      });
    });
  });
});

it('must save to favorite on click heart icon', async () => {
  render(
    <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
      <ListItem {...item} tag="test" />
    </QueryProviderWrapper>,
  );

  await act(async () => {
    fireEvent.press(screen.getByTestId('heartBtn'));
    await waitFor(() => {
      expect(AsyncStorage.setItem).toBeCalledWith(
        FAV_STORAGE_KEY,
        JSON.stringify([item]),
      );
    });
  });
});

it('checks if Async Storage is used', async () => {
  render(
    <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
      <ListItem {...item} tag="test" />
    </QueryProviderWrapper>,
  );

  await act(async () => {
    expect(AsyncStorage.getItem).toBeCalledWith(FAV_STORAGE_KEY);
  });
});
