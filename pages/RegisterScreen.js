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
    <View>
      <Text>Register Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({});
