import React from 'react';
import { View, Text, StyleSheet} from 'react-native';



type BasicInfoCardProps = {
  title: string;
  height: number;
  weight: number;
  baseExperience: number;
  species: string
};

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  title,
  height,
  weight,
  baseExperience,
  species
}) => {
  return (
    <View style={[styles.card]}>
      <Text style={[styles.cardTitle]}>{title}</Text>
      <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Height:</Text>
                  <Text style={styles.infoValue}>{height} m</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Weight:</Text>
                  <Text style={styles.infoValue}>{weight} kg</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Base Experience:</Text>
                  <Text style={styles.infoValue}>{baseExperience}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Species:</Text>
                  <Text style={styles.infoValue}>{species}</Text>
                </View>
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
});

export default BasicInfoCard;
