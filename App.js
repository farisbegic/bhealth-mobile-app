import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import colors from "./constants/colors";
import routes from "./constants/routes";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import SplashScreen from "./pages/SplashScreen";
import ProfileScreen from "./pages/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName={routes.HOME}>
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName={routes.LOGIN}>
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.tetriary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.tetriary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.SPLASH}>
        <Stack.Screen
          name={routes.SPLASH}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.AUTH}
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.HOME}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
