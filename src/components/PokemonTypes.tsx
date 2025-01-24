import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PokemonType {
    type: {
      name: string;
    };
  }
  

interface PokemonTypesProps {
  types: PokemonType[];
}

const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Types</Text>
      <View style={styles.typeContainer}>
        {types.map((type, index) => (
          <Text
            key={index}
            style={[styles.typeBadge, styles[`type_${type.type.name}`] as any]}>
            {type.type.name.toUpperCase()}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles: { [key: string]: any } = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeBadge: {
    padding: 8,
    borderRadius: 4,
    margin: 4,
    color: '#fff',
  },
  type_grass: {
    backgroundColor: '#78C850',
  },
  type_fire: {
    backgroundColor: '#F08030',
  },
  type_water: {
    backgroundColor: '#6890F0',
  },
  type_bug: {
    backgroundColor: '#A8B820',
  },
  type_normal: {
    backgroundColor: '#A8A878',
  },
  type_poison: {
    backgroundColor: '#A040A0',
  },
  type_electric: {
    backgroundColor: '#F8D030',
  },
  type_ground: {
    backgroundColor: '#E0C068',
  },
  type_flying: {
    backgroundColor: '#A890F0',
  },
  type_ice: {
    backgroundColor: '#98D8D8',
  },
  type_rock: {
    backgroundColor: '#B8A038',
  },
  type_psychic: {
    backgroundColor: '#F85888',
  },
  type_fairy: {
    backgroundColor: '#EE99AC',
  },
  type_dragon: {
    backgroundColor: '#7038F8',
  },
  type_ghost: {
    backgroundColor: '#705898',
  },
});

export default PokemonTypes;