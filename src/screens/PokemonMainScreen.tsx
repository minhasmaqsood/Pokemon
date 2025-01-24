import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import Header from '../components/Header';

type NavigationProp = {
  navigate: (screen: string, params?: { id: string }) => void;
};

type PokemonListScreenProps = {
  navigation: NavigationProp;
};

type Pokemon = {
  name: string;
  url: string;
};

export default function PokemonListScreen({
  navigation,
}: PokemonListScreenProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Local state for fetched Pokémon
  const [offset, setOffset] = useState(0); // Current offset for pagination
  const [hasMore, setHasMore] = useState(true); // Tracks if there's more data to fetch
  const limit = 20; // Number of items to fetch per request

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery(
    { offset, limit },
    { skip: !hasMore } // Skip API calls if there's no more data
  );

  // Append new Pokémon to the list when data is updated
  useEffect(() => {
    if (data?.results?.length) {
      setPokemonList((prevList) => [...prevList, ...data.results]);

      // Check if the fetched batch is less than the limit (end of list)
      if (data.results.length < limit) {
        setHasMore(false);
      }
    }
  }, [data]);

  // Load more Pokémon
  const loadMore = () => {
    if (!isFetching && hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  if (error) return <Text style={styles.errorText}>Please try again</Text>;

  const renderItem = ({ item }: { item: Pokemon }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PokemonDetails', {
            id: item.url.split('/').slice(-2, -1)[0],
          })
        }
        testID={`pokemon-card-${item.name}`}
      >
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Pokemon List'} showBackButton={false} />
      {isLoading && offset === 0 ? ( // Show loader only for initial fetch
        <View style={styles.loading} testID="loading-indicator">
          <ActivityIndicator size="large" color="#6200ea" />
        </View>
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? <ActivityIndicator size="small" color="#6200ea" testID="loading-more-indicator" /> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f7937d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize', 
  },
});