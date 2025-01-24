import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useGetPokemonDetailsQuery } from '../store/pokemonApi';
import Header from '../components/Header';
import BasicInfoCard from '../components/BasicInfoCard';
import Abilities from '../components/Abilities';
import PokemonStats from '../components/PokemonStats';
import PokemonTypes from '../components/PokemonTypes';
import PokemonMoves from '../components/PokemonMoves';
import PokemonGameIndices from '../components/PokemonGameIndices';

type PokemonDetailsScreenProps = {
  route: RouteProp<{ params: { id: number } }, 'params'>;
};

export default function PokemonDetailsScreen({
  route,
}: PokemonDetailsScreenProps): JSX.Element {
  const { id } = route.params;
  const { data, error, isLoading } = useGetPokemonDetailsQuery(id.toString());

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading} testID="loading-indicator">
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load Pokémon details!</Text>
      </SafeAreaView>
    );
  }

  // Destructure the data object
  const {
    name,
    height,
    weight,
    base_experience,
    species,
    sprites,
    abilities,
    stats,
    types,
    moves,
    game_indices,
  } = data;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${name.toUpperCase()} Details`} showBackButton={true} />
      <ScrollView>
        {/* Pokémon Sprites */}
        <View style={styles.spriteContainer}>
          <Image
            source={{ uri: sprites.front_default }}
            style={styles.sprite}
            testID="sprite-front"
          />
          <Image
            source={{ uri: sprites.back_default }}
            style={styles.sprite}
            testID="sprite-back"
          />
        </View>
        {/* Pokémon Name */}
        <Text style={styles.name}>{name.toUpperCase()}</Text>
        {/* Basic Info */}
        <BasicInfoCard
          title={'Basic Info'}
          height={height}
          weight={weight}
          baseExperience={base_experience}
          species={species.name}
        />
        {/* Abilities */}
        <Abilities abilities={abilities} />

        {/* Stats */}
        <PokemonStats stats={stats} />
        {/* Types */}
        <PokemonTypes types={types} />
        {/* Moves Section */}
        <PokemonMoves moves={moves} />
        {/* Game Indices Section */}
        <PokemonGameIndices gameIndices={game_indices} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    margin: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  spriteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sprite: {
    width: 150,
    height: 150,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
});