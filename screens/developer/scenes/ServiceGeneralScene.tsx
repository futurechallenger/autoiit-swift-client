import * as React from "react";
import { StyleSheet } from "react-native";
import {
  VStack,
  Box,
  Button,
  Input,
  Pressable,
  View,
  Text,
  Divider,
} from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";

const { useState } = React;

export const ServiceGeneralScene = ({ params }: { params: any }) => {
  const { service } = params ?? {};

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleClick = () => {
    console.log("Service to save: ", { name, desc });
  };

  return (
    <View width="100%">
      <Text fontSize="lg">General</Text>
      <Divider marginTop={15} />
      <VStack>
        <TextInputDesc
          marginTop={10}
          text="Service name"
          value={service?.name}
          numberOfLines={1}
          description="Your product name or service name"
          onTextChanged={(serviceName: string | undefined) => {
            setName(serviceName ?? "");
          }}
        />
        <TextInputDesc
          marginTop={10}
          text="Description"
          value={service?.description}
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
          onTextChanged={(description: string | undefined) => {
            setDesc(description ?? "");
          }}
        />
        <Divider marginTop={15} />
        <Box alignSelf="flex-end" marginTop={15}>
          <Button style={styles.button} onPress={handleClick}>
            Save
          </Button>
        </Box>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    width: 90,
  },
});
