import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useGetPokemonListQuery} from '../store/pokemonApi';

type NavigationProp = {
  navigate: (screen: string, params?: {id: string}) => void;
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
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Local state to store all Pokémon
  const [offset, setOffset] = useState(0); // Tracks the current offset
  const limit = 20; // Number of items to fetch per request

  const {data, error, isLoading, isFetching} = useGetPokemonListQuery(
    {offset, limit},
    {skip: offset > 0 && pokemonList.length > 0},
  );

  // Append new Pokémon to the list when data is updated
  React.useEffect(() => {
    if (data?.results) {
      setPokemonList(prevList => [...prevList, ...data.results]);
    }
  }, [data]);

  const loadMore = () => {
    if (!isFetching && data?.results.length) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  if (error) return <Text>Please try again</Text>;

  return (
    <View style={{flex: 1}}>
      {isLoading && offset === 0 ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            data={pokemonList}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PokemonDetails', {
                    id: item.url.split('/').slice(-2, -1)[0],
                  })
                }>
                <View style={styles.item}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetching ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
