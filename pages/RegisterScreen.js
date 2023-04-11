import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, doc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import routes from "../constants/routes";
import colors from "../constants/colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebase";
import collections from "../constants/collections";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleRegister = () => {
    console.log("Registering...");
    setError("");
    if (!name) {
      alert("Please fill Name");
      return;
    }
    if (!surname) {
      alert("Please fill Surname");
      return;
    }
    if (!email) {
      alert("Please fill email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    if (!username) {
      alert("Please fill Username");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          updateProfile(userCredential.user, {
            displayName: username,
          });

          addDoc(collection(db, collections.users), {
            uid: userCredential.user.uid,
            name: name,
            surname: surname,
            username: username,
            email: email,
            date: date,
          });
        }
        navigation.navigate(routes.TAB_NAVIGATOR);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👋</Text>
      <Text style={styles.heading}>Create your account!</Text>
      <Text>It's free and easy</Text>
      <View style={styles.registerForm}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 40,
  },
  registerForm: {
    width: "80%",
    paddingTop: 30,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
