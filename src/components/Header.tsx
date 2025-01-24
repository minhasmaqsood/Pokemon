import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define navigation type
type RootStackParamList = {
  PokemonDetails: { id: string }; 
};

type HeaderProps = {
  title: string;
  showBackButton: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        {showBackButton ?<Text style={styles.backText}>{"<"}</Text> : <></>}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    alignSelf: 'center'
  },
});

export default Header;
