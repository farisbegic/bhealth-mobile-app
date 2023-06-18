import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";
import { getProfile } from "../services/user";
import routes from "../constants/routes";
import EditProfile from "./EditProfile";
import colors from "../constants/colors";
import { doc, deleteDoc } from "firebase/firestore";
import collections from "../constants/collections";
import labs from "../constants/labs";
import LabCard from "../components/common/LabCard";

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

  const deleteUser = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const docRef = doc(db, collections.users, user.id);

              await deleteDoc(docRef)
                .then(() => {
                  console.log("Entire Document has been deleted successfully.");
                })
                .catch((error) => {
                  console.log(error);
                });

              handleLogout();

              console.log("Account deleted successfully");
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    auth.signOut();
    navigation.navigate(routes.LOGIN);
    setUser(null);
  };

  const showEditProfile = () => setModalVisible(true);

  const hideEditProfile = () => setModalVisible(false);

  const navigateToLabInfo = (lab) => {
    navigation.navigate("Laboratory", { lab: lab });
  };

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
              {user?.name} {user?.surname}
            </Text>
            <Text style={styles.paragraph}>@{user?.username}</Text>
          </View>

          <EditProfile
            visible={modalVisible}
            user={user}
            onClose={hideEditProfile}
            onUpdate={setUser}
            onDelete={deleteUser}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={showEditProfile}
              style={styles.editProfileButton}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.savedLabs}>
            <Text style={styles.savedLabsHeading}>Saved Labs:</Text>
            <View style={styles.savedLabsContainer}>
              {labs.map((lab, index) => {
                if (index % 2 == 0) {
                  return (
                    <LabCard
                      key={index}
                      lab={lab}
                      onPress={() => navigateToLabInfo(lab)}
                    />
                  );
                }
              })}
            </View>
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
    paddingTop: 20,
  },
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoutButton: {
    height: 40,
    width: 100,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: 500,
  },
  editProfileButton: {
    height: 40,
    width: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    padding: 10,
  },
  savedLabs: {
    marginTop: 50,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  savedLabsHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  savedLabsContainer: {
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
});
