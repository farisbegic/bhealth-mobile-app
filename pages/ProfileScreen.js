import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Text>Email: {auth.currentUser.email}</Text>
      <Text>Username: {auth.currentUser.displayName}</Text>
      <Text>UID: {auth.currentUser.uid}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
