import * as React from "react";
import { StyleSheet } from "react-native";
import {
  VStack,
  Button,
  Box,
  Input,
  HStack,
  View,
  Text,
  Divider,
} from "native-base";
import { TextInputDesc } from "../../components/TextInputDesc";

export const ServiceGeneralScene = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="lg">General</Text>
      <Divider />
      <VStack>
        <TextInputDesc
          text="Service name"
          numberOfLines={1}
          description="Your product name or service name"
        />
        <TextInputDesc
          text="Description"
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
        />
        <Divider />
        <Button>Save</Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
