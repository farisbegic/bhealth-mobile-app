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
import SearchScreen from "./pages/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const getTabBarIcon = (name, color, size, focused) => {
    const iconColor = focused ? colors.primary : color;
    return <AntDesign name={name} color={iconColor} size={size} />;
  };
  return (
    <Tab.Navigator initialRouteName={routes.HOME}>
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("home", color, size, focused),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={routes.SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("search1", color, size, focused),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("user", color, size, focused),
          tabBarShowLabel: false,
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
          name={routes.TAB_NAVIGATOR}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
