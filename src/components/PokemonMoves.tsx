import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PokemonMove {
    move: {
      name: string;
    };
  }
  
interface PokemonMovesProps {
  moves: PokemonMove[];
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ moves }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Moves</Text>
      <View style={styles.movesContainer}>
        {moves.slice(0, 10).map((move, index) => (
          <Text key={index} style={styles.moveBadge}>
            {move.move.name}
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
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveBadge: {
    padding: 8,
    borderRadius: 4,
    margin: 4,
    backgroundColor: '#f0f0f0',
  },
});

export default PokemonMoves;