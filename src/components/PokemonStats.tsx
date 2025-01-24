import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({stats}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Stats</Text>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <Text style={styles.statName}>{stat.stat.name}:</Text>
          <View style={styles.statBarContainer}>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
            <View
              style={[
                styles.statBar,
                {width: `${(stat.base_stat / 125) * 100}%`},
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  statName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    width: '40%',
  },
  statValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10,
  },
  statBarContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statBar: {
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
});

export default PokemonStats;
