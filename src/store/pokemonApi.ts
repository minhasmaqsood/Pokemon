import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from './config';
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: builder => ({
    getPokemonList: builder.query({
      query: ({offset = 0, limit = 20}: {offset: number; limit: number}) =>
        `pokemon?offset=${offset}&limit=${limit}`,
    }),
    getPokemonDetails: builder.query({
      query: (id: string) => `pokemon/${id}/`,
    }),
  }),
});

export const {useGetPokemonListQuery, useGetPokemonDetailsQuery} = pokemonApi;
