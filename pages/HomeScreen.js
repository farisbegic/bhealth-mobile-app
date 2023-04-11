import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Email: {auth.currentUser.email}</Text>
      <Text>Username: {auth.currentUser.displayName}</Text>
      <Text>UID: {auth.currentUser.uid}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
