import 'react-native';
import React from 'react';

import {it} from '@jest/globals';
import {cleanup, render, screen, waitFor} from '@testing-library/react-native';
import {QueryProviderWrapper, defaultQueryClient} from 'test/global';
import {MainScreen} from './MainScreen';
import {mockedResponse} from '../../../test-setup';
const label = mockedResponse.feed.entry[0].title.label;

describe('<MainScreen />', () => {
  afterEach(() => {
    defaultQueryClient.clear();
    cleanup();
  });
  beforeEach(() => {});

  it('renders correctly', async () => {
    render(
      <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
        <MainScreen />
      </QueryProviderWrapper>,
    );

    await waitFor(async () => {
      const labelEl = await screen.findByText('Albums Searcher');
      const inputEl = await screen.findByPlaceholderText('Type album title');
      const iconEl = await screen.findByTestId('heartIcon');

      expect(labelEl).toBeDefined();
      expect(inputEl).toBeDefined();
      expect(iconEl).toBeDefined();
    });
  });

  it('renders list', async () => {
    render(
      <QueryProviderWrapper cleanQueryClient={defaultQueryClient}>
        <MainScreen />
      </QueryProviderWrapper>,
    );

    await waitFor(async () => {
      const labelEl = await screen.findByText('Loading...');
      expect(labelEl).toBeDefined();
    });

    await waitFor(async () => {
      expect(await screen.findByTestId('mainList')).toBeDefined();
      expect(await screen.getByText(label)).toBeTruthy();
      expect(await screen.getByText(label)).not.toBeNull();
    });
  });
});
