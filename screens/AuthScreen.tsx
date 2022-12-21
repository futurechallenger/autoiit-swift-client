import * as React from "react";
import {
  Center,
  Text,
  VStack,
  Button,
  Box,
  Container,
  Heading,
  Actionsheet,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationAction, useNavigation } from "@react-navigation/native";

const { useState } = React;

const AuthScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    console.log("Actionsheet is closing");
    setIsOpen(false);
  };
  const handleSelect = (selected: string) => {
    switch (selected) {
      case "email":
        console.log("Selected continue with email");
        if (isOpen) setIsOpen(false);
        navigation.navigate("Email");
        break;
      case "cancel":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <VStack space="2.5" mt="4" padding={4}>
        <Heading>Introduction of the app</Heading>
        <Box>
          <Text>
            Stack aligns items vertically or horizontally based on the direction
            prop.
          </Text>
        </Box>
        <Center
          bg="primary.100"
          _text={{ color: "white", fontWeight: "bold" }}
        ></Center>
        <Container>
          <Button onPress={handleClick}>Continue</Button>
        </Container>
        <Actionsheet isOpen={isOpen} onClose={handleClose}>
          <Actionsheet.Content>
            <Box w="100%" px={4} h={60} justifyContent="center">
              Continue with
            </Box>
            <Actionsheet.Item onPress={() => handleSelect("email")}>
              Email
            </Actionsheet.Item>
            <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item onPress={() => handleSelect("cancel")}>
              Cancel
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </SafeAreaView>
  );
};

export { AuthScreen };
