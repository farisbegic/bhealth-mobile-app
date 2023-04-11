// Import React and Component
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import routes from "../constants/routes";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email) {
      alert("Please fill email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
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
      <Text>Login Screen</Text>
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
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
        <Text>Register</Text>
      </TouchableOpacity>

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({});
