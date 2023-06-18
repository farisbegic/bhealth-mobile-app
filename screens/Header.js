import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.headerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#149998",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#F2F2F2",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Header;
