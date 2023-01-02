/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MyFlowScreen from "../screens/MyFlowScreen";
import {
  BottomStackParamList,
  RootTabParamList,
  MainTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthScreen } from "../screens/AuthScreen";
import { EmailScreen } from "../screens/EmailScreen";
import { PasswordScreen } from "../screens/PasswordScreen";
import { StackNavigatorParamList } from "../types";
import { AuthContext } from "./AuthContext";
import { AccountScreen } from "../screens/Profile/AccountScreen";
import { ExploreScreen } from "../screens/ExploreScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const { useState, useEffect } = React;

const NavStack = createNativeStackNavigator<StackNavigatorParamList>();

export const AuthNavigator = ({ isSignedIn }: { isSignedIn: boolean }) => {
  return (
    <NavStack.Navigator>
      {!isSignedIn ? (
        <>
          <NavStack.Screen
            name="Root"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <NavStack.Screen
            name="Email"
            component={EmailScreen}
            options={{ headerShown: true }}
          />
          <NavStack.Screen
            name="Password"
            component={PasswordScreen}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <>
          <NavStack.Screen
            name="Tabs"
            component={RootNavigator}
            options={{ headerShown: false }}
          />
          <NavStack.Screen name="Account" component={AccountScreen} />
          <NavStack.Screen
            name="Search"
            component={SearchScreen}
            options={{ animation: "fade" }}
          />
        </>
      )}
    </NavStack.Navigator>
  );
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const readToken = async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem("@token");
      } catch (e) {
        token = null;
      }

      setToken(token);
    };

    readToken();
  }, []);

  const renderNavigator = (token: string | null) => {
    return <AuthNavigator isSignedIn={!!token} />;
  };

  return (
    <AuthContext.Provider
      value={{ token: token ?? "", setAuthToken: (token) => setToken(token) }}
    >
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {renderNavigator(token)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<BottomStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MyFlow"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="MyFlow"
        component={MyFlowScreen}
        options={({ navigation }: MainTabScreenProps<"MyFlow">) => ({
          title: "My Flow",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      {/*<BottomTab.Screen
        name="Create"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
