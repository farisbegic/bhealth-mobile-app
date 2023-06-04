import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "./Header";
import Footer from "./Footer";

const HomeScreen = ({ navigation }) => {
  const laboratories = [
    { id: 1, name: "Laboratory 1" },
    { id: 2, name: "Laboratory 2" },
    { id: 3, name: "Laboratory 3" },
  ];

  const renderLaboratories = () => {
    return laboratories.map((lab) => (
      <TouchableOpacity
        key={lab.id}
        style={styles.modalItem}
        onPress={() => navigation.navigate("Laboratory", { laboratory: lab })}
      >
        <Text style={styles.modalItemText}>{lab.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchBarText}>Search Bar</Text>
      </View>

      {/* Laboratories */}
      <View style={styles.laboratories}>
        <Text style={styles.laboratoriesTitle}>Laboratories</Text>
        {renderLaboratories()}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    paddingLeft: 10,
  },
  searchBarText: {
    fontSize: 16,
  },
  laboratories: {
    flex: 1,
    padding: 10,
  },
  laboratoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default HomeScreen;
