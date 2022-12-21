import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreen";
import { EmailScreen } from "../screens/EmailScreen";
import { PasswordScreen } from "../screens/PasswordScreen";
import { AuthNavigatorParamList } from "../types";
import { RootNavigator } from ".";

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Tabs" component={RootNavigator} />
    </Stack.Navigator>
  );
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();
