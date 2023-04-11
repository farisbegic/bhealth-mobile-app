import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";
import { getProfile } from "../services/user";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const user = await getProfile(auth.currentUser.uid);
      setUser(user);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.profile}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.image}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileHeading}>
              {auth.currentUser.displayName}
            </Text>
            <Text style={styles.paragraph}>{auth.currentUser.email}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  profileDetails: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
    color: "#888",
  },
});
