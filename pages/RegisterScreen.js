import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import routes from "../constants/routes";
import colors from "../constants/colors";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");
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
        const user = userCredential.user;

        navigation.navigate(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") setError(error.message);
        else if (error.code === "auth/user-not-found")
          setError("No User Found");
        else {
          setError("Please check your email id or password");
        }
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
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>

      {error && alert(error)}
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
