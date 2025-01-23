import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useGetPokemonDetailsQuery} from '../store/pokemonApi';

export default function PokemonDetailsScreen({route}: any) {
  const {id} = route.params;
  const {data, error, isLoading} = useGetPokemonDetailsQuery(id);

  return (
    <View style={styles.container}>
      {isLoading ? (
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
          <Text style={styles.name}>{data.name}</Text>
          <Text>Height: {data.height}</Text>
          <Text>Weight: {data.weight}</Text>
          <Text>Base Experience: {data.base_experience}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
