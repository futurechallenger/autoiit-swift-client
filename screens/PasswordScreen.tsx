import * as React from "react";
import {
  Text,
  VStack,
  Heading,
  Input,
  Button,
  Box,
  Pressable,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { request, gql } from "graphql-request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { PasswordScreenRouteProp } from "../types";

const { useState } = React;

const loginGql = gql`
  mutation login($userInfo: UserInfoInput!) {
    loginIn(userInfo: $userInfo)
  }
`;
const PasswordScreen = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const route = useRoute<PasswordScreenRouteProp>();
  const { exists } = route.params;

  const handleClick = async () => {
    try {
      const email = await AsyncStorage.getItem("@email");

      if (!exists) {
        return;
      }

      const variables = {
        userInfo: {
          email,
          password: text,
        },
      };
      const res = await request(
        "http://127.0.0.1:5050/graphql",
        loginGql,
        variables
      );

      if (res?.data) {
        AsyncStorage.setItem("@token", res?.data);
      }
    } catch (e) {
      console.error("ERROR in login", e);
      // setShowError(true);
    }
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  const handlePress = () => {
    // TODO: forget password
  };

  const headingText = exists
    ? "Welcome back! What's your password"
    : "Create your password";
  const buttonTitle = exists ? "Login" : "SignIn";

  return (
    <SafeAreaView>
      <VStack paddingX="4" space="10" paddingY="5">
        <Heading>{headingText}</Heading>
        <Box>
          <Input
            type={show ? "text" : "password"}
            placeholder="Your password"
            InputRightElement={
              <PasswordToggle show={show} toggleShow={() => setShow(!show)} />
            }
            onChangeText={handleChangeText}
          />
        </Box>
        <Box>
          <Button onPress={handleClick}>{buttonTitle}</Button>
          <Pressable onPress={handlePress} alignSelf="center" paddingY={2}>
            <Text fontWeight="bold" fontSize="11">
              Forget password?
            </Text>
          </Pressable>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

const PasswordToggle = ({
  show,
  toggleShow,
}: {
  show: boolean;
  toggleShow: () => void;
}) => {
  const handlePress = () => {
    toggleShow();
  };

  return (
    <Pressable onPress={handlePress}>
      <Icon
        as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5}
        mr={2}
        color="muted.400"
      />
    </Pressable>
  );
};

export { PasswordScreen };
