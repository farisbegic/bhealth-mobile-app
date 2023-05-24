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
import routes from "../constants/routes";
import colors from "../constants/colors";
import { db } from "../firebase";
import collections from "../constants/collections";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/common/CustomInput";

const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState("");

  const initialValues = {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    date: new Date(),
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleRegister = (values) => {
    const { name, surname, username, email, password, date } = values;

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
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👋</Text>
      <Text style={styles.heading}>Create your account!</Text>
      <Text>It's free and easy</Text>
      <View style={styles.registerForm}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ handleSubmit, isValid, values }) => (
            <>
              <Field
                component={CustomInput}
                name="name"
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Field
                component={CustomInput}
                name="surname"
                placeholder="Surname"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Field
                component={CustomInput}
                name="username"
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
              />
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
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
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
