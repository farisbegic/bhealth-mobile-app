import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { auth } from "../firebase";
import colors from "../constants/colors";
import routes from "../constants/routes";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        navigation.replace(routes.TAB_NAVIGATOR);
      } else {
        navigation.replace(routes.AUTH);
      }
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});
