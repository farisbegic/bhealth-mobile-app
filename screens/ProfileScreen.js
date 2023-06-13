import React, { useEffect, useState } from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity, FlatList, Button} from "react-native";
import {auth, db} from "../firebase";
import { getProfile } from "../services/user";
import { signOut } from "firebase/auth";
import routes from "../constants/routes";
import EditProfile from "./EditProfile";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const user = await getProfile(auth.currentUser.uid);
      setUser(user);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigation.navigate(routes.LOGIN);
    setUser(null);
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      await db.collection("users").doc(auth.currentUser.uid).delete();
      await auth.currentUser.delete();
      handleLogout();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const showEditProfile = () => setModalVisible(true);

  const hideEditProfile = () => setModalVisible(false);

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
              {user.name} {user.surname}
            </Text>
            <Text style={styles.paragraph}>{auth.currentUser.email}</Text>
          </View>

          <TouchableOpacity onPress={showEditProfile} style={styles.editProfileButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <EditProfile visible={modalVisible} user={user} onClose={hideEditProfile} />

        </View>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    height: 40,
    width: 100,
    backgroundColor: "#cf0808",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: 500,
  },
  menu: {
    marginTop: 30,
  },
  editProfileButton: {
    height: 40,
    width: 100,
    backgroundColor: "#369",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    padding: 10,
    marginTop: 30,
  }
});
