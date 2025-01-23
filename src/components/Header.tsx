import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default function PokemonDetailsScreen({route}: any) {
  const {id} = route.params;

  return <View style={styles.container}></View>;
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
