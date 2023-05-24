import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import routes from "../constants/routes";
import colors from "../constants/colors";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/common/CustomInput";

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleLogin = (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate(routes.TAB_NAVIGATOR);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👋</Text>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text>Please log in using your credentials</Text>
      <View style={styles.loginForm}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ handleSubmit, isValid, values }) => (
            <>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                disabled={!isValid || values.email === ""}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
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
