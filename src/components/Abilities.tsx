import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface AbilitiesProps {
  abilities: PokemonAbility[];
}

const Abilities: React.FC<AbilitiesProps> = ({ abilities }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Abilities</Text>
      {abilities.map((ability: PokemonAbility, index: number) => (
        <View key={index} style={styles.abilityContainer}>
          <Text style={styles.abilityText}>{ability.ability.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  abilityContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  abilityText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default Abilities;