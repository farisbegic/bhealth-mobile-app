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
import colors from "../constants/colors";

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
        navigation.navigate(routes.TAB_NAVIGATOR);
      })
      .catch((error) => {
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
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text>Please log in using your credentials</Text>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
          <Text>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>

      {error && alert(error)}
    </View>
  );
};
export default LoginScreen;

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
  loginForm: {
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
