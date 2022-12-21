import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";

import { request, gql } from "graphql-request";
import { Actionsheet, Box, Text, Button } from "native-base";

const loginGql = gql`
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }
`;
const variables = { userInfo: { email: "bruce@test.com", password: "123" } };

export const LoginScreen = () => {
  const [showError, setShowError] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("Login button pressed");
      const res = await request(
        "http://127.0.0.1:5050/graphql",
        loginGql,
        variables
      );
    } catch (e) {
      console.error("ERROR in login", e);
      setShowError(true);
    }
  };

  const handleSignIn = () => {
    console.log("Clicked signIn button");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button onPress={handleLogin}>Login</Button>
      <Button onPress={handleSignIn}>SignIn</Button>

      <Actionsheet isOpen={openSheet}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {showError && (
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "red",
            left: 0,
            right: 0,
            bottom: 50,
          }}
        >
          <Text>Error</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
