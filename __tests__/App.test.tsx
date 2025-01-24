import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import AppNavigator from '../src/navigation/NavigationHandler';

jest.mock('../src/navigation/NavigationHandler', () => {
  return jest.fn(() => null);
});

describe('App', () => {
  it('renders the AppNavigator', () => {
    const { getByTestId } = render(<App />);
    expect(AppNavigator).toHaveBeenCalled();
  });
});