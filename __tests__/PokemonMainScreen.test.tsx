import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useGetPokemonListQuery } from '../src/store/pokemonApi';
import PokemonMainScreen from '../src/screens/PokemonMainScreen';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/store/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

const mockData = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

describe('PokemonMainScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching data', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      isFetching: false,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <PokemonMainScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message on error', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
      isFetching: false,
    });

    const { getByText } = render(
      <NavigationContainer>
        <PokemonMainScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText('Please try again')).toBeTruthy();
  });

  it('renders list of pokemon', async () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      isFetching: false,
    });

    const { getByText } = render(
      <NavigationContainer>
        <PokemonMainScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('bulbasaur')).toBeTruthy();
      expect(getByText('ivysaur')).toBeTruthy();
    });
  });

  it('navigates to PokemonDetails on card press', async () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      isFetching: false,
    });

    const { getByText } = render(
      <NavigationContainer>
        <PokemonMainScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    const bulbasaurCard = getByText('bulbasaur');
    fireEvent.press(bulbasaurCard);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PokemonDetails', {
        id: '1',
      });
    });
  });
});