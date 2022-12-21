import * as React from "react";
import {
  VStack,
  Heading,
  Input,
  Button,
  Box,
  useToast,
  Spinner,
  ZStack,
} from "native-base";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyFindUserQuery } from "../redux/gql/userInfoService";
import { EmailScreenNavigationProp } from "../types";

const { useState } = React;

/**
 * TODO:
 * 1. Only when the email address is valid
 * Enable the `Continue` button to
 * navigate the next page
 * 2. check if the email is registered.
 * If it is, show login in next screen.
 * If not, show `Create account` there
 */
const EmailScreen = () => {
  const navigation = useNavigation<EmailScreenNavigationProp>();
  const [text, setText] = useState<string>("");
  const [trigger, { data, error, isFetching }] = useLazyFindUserQuery();
  const toast = useToast();

  const handleClick = async () => {
    if (!text) {
      return;
    }

    try {
      AsyncStorage.setItem("@email", text ?? "");

      const exists = await trigger({ email: text }).unwrap();
      navigation.navigate("Password", { exists });
    } catch (e) {
      console.error("E:", e);
      toast.show({ description: "Error" });
    }
  };

  const handleChangeText = (newText: string) => {
    // TODO: check if it is a valid email address
    setText(newText);
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <VStack flex="1">
        <ZStack
          flex="1"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <VStack
            paddingX="4"
            paddingTop={5}
            w="full"
            space="10"
            position="absolute"
            top="0"
          >
            <Heading>What's your email</Heading>
            <Box>
              <Input placeholder="Your email" onChangeText={handleChangeText} />
            </Box>
          </VStack>

          {isFetching && <Spinner size="lg" />}
        </ZStack>
        <Box paddingBottom={10} paddingX="5">
          <Button onPress={handleClick}>Continue</Button>
        </Box>
      </VStack>
    </View>
  );
};

export { EmailScreen };
