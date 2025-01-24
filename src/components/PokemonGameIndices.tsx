import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PokemonGameIndicesProps {
  gameIndices: { version: { name: string } }[];
}

const PokemonGameIndices: React.FC<PokemonGameIndicesProps> = ({ gameIndices }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Game Indices</Text>
      <View style={styles.gameIndicesContainer}>
        {gameIndices.map((game, index) => (
          <Text key={index} style={styles.gameIndexText}>
            {game.version.name.toUpperCase()}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  gameIndicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  gameIndexText: {
    backgroundColor: '#A040A0',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PokemonGameIndices;