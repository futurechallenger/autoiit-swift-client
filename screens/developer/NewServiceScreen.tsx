import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Button, View, Text, Divider, VStack, HStack } from "native-base";
import { TextInputDesc } from "../../components/TextInputDesc";

const { useState } = React;

export const NewServiceScreen = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleCancel = () => {};

  const handleClick = () => {};

  return (
    <View>
      <Text>new service</Text>

      <Divider />
      <VStack>
        <TextInputDesc
          marginTop={10}
          text="Service name"
          numberOfLines={1}
          description="Your product name or service name"
          onTextChanged={(serviceName: string | undefined) => {
            setName(serviceName ?? "");
          }}
        />
        <TextInputDesc
          marginTop={10}
          text="Description"
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
          onTextChanged={(description: string | undefined) => {
            setDesc(description ?? "");
          }}
        />
        <Divider marginTop={15} />
        <Box alignSelf="flex-end" marginTop={15}>
          <HStack>
            <Button style={styles.button} onPress={handleCancel}>
              Cancel
            </Button>
            <Button style={styles.button} onPress={handleClick}>
              Save
            </Button>
          </HStack>
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
