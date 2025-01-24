import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useGetPokemonDetailsQuery } from '../src/store/pokemonApi';
import PokemonDetailScreen from '../src/screens/PokemonDetailScreen';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/store/pokemonApi', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
}));

const mockRoute = {
  key: 'mockKey',
  name: 'params' as const,
  params: {
    id: 1,
  },
};

const mockData = {
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  species: { name: 'bulbasaur' },
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } },
  ],
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
  ],
  types: [
    { type: { name: 'grass' } },
    { type: { name: 'poison' } },
  ],
  moves: [
    { move: { name: 'razor-wind' } },
    { move: { name: 'swords-dance' } },
  ],
  game_indices: [
    { version: { name: 'red' } },
    { version: { name: 'blue' } },
  ],
};

describe('PokemonDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching data', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <PokemonDetailScreen route={mockRoute} />
      </NavigationContainer>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message on error', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByText } = render(
      <NavigationContainer>
        <PokemonDetailScreen route={mockRoute} />
      </NavigationContainer>
    );

    expect(getByText('Failed to load Pokémon details!')).toBeTruthy();
  });

  it('renders pokemon details', async () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <PokemonDetailScreen route={mockRoute} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('BULBASAUR')).toBeTruthy();
      expect(getByText('Basic Info')).toBeTruthy();
      expect(getByText('overgrow')).toBeTruthy();
      expect(getByText('hp:')).toBeTruthy();
      expect(getByText('GRASS')).toBeTruthy();
      expect(getByText('razor-wind')).toBeTruthy();
      expect(getByText('RED')).toBeTruthy();
      expect(getByTestId('sprite-front')).toBeTruthy();
      expect(getByTestId('sprite-back')).toBeTruthy();
    });
  });
});