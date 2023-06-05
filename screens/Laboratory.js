import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const LaboratoryScreen = ({ route }) => {
  const { laboratory } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{laboratory.name}</Text>
      <Text style={styles.info}>{laboratory.info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
  },
});

export default LaboratoryScreen;