import * as React from "react";
import {
  Button,
  View,
  Text,
  Divider,
  Box,
  VStack,
  Radio,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
} from "native-base";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { useIsFocused } from "@react-navigation/native";

const { useState, useEffect } = React;

export const CreateTriggerScene = () => {
  const [refreshed, setRefreshed] = useState(false);
  const [triggerName, setTriggerName] = useState();
  const [description, setDescription] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !refreshed) {
      setRefreshed(true);
    }
  }, [isFocused]);

  return (
    <View bg="green.50" h="full">
      <ThemedTitle>Create new trigger</ThemedTitle>

      <Divider />
      <TextInputDesc
        marginTop={10}
        subTitle="Name"
        text=""
        placeholder=""
        description="Use sentence case capitalization — no period"
        onTextChanged={(value) => console.log("Trigger name: ", value)}
      />
      <TextInputDesc
        marginTop={10}
        subTitle="Description"
        text=""
        placeholder=""
        description="Must be a complete sentence starting with “This trigger fires” and ending with a period"
        onTextChanged={(value) => console.log("Trigger description: ", value)}
      />
      <VStack>
        <ThemedTitle>Endpoint</ThemedTitle>
        <Radio.Group
          name="endpoint"
          onChange={(nextValue) => console.log(">>>Next Value: ", nextValue)}
        >
          <Radio value="api">API</Radio>
          <Radio value="feed">Feed(RSS or Atom)</Radio>
        </Radio.Group>
      </VStack>
      <InputGroup>
        <InputLeftAddon children={"https://"} />
        <Input />
        <Text>
          API endpoint for this trigger. Must be in snake_case and begin with a
          letter.
        </Text>
      </InputGroup>
      <Divider />
      <HStack>
        <Button>Save</Button>
      </HStack>
    </View>
  );
};
