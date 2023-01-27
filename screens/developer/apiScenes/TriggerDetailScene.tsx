import * as React from "react";
import {
  Box,
  Button,
  VStack,
  View,
  Text,
  Divider,
  InputGroup,
  InputLeftAddon,
  Input,
  HStack,
  Pressable,
  FlatList,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { TriggerFieldInput } from "./TriggerFieldInput";
import * as Types from "../../../redux/types.generated";

const { useState, useEffect } = React;

export const TriggerDetailScene = () => {
  const route = useRoute();
  const { trigger, serviceApi } = route.params ?? {};

  const [name, setName] = useState();
  const [cancelCode, setCancelCode] = useState<string | undefined>();
  const [fields, setFields] = useState<Types.TriggerField[]>([]);
  const [description, setDescription] = useState();
  const [endpointType, setEndpointType] = useState();
  const [endpointPath, setEndpointPath] = useState();
  const [showTriggerFields, setShowTriggerFields] = useState(false);

  useEffect(() => {
    setName(trigger.name);
    setDescription(trigger.description);
    setEndpointPath(trigger.endpointPath);
    setEndpointType(trigger.endpointType);
  }, []);

  const handleInput = (nextValue) => {
    setEndpointPath(nextValue);
  };

  const handleTriggerFieldCancel = (code: string) => {
    setCancelCode(code);
  };

  const handleSaveTriggerField = (field: Types.TriggerField) => {
    setFields([...fields, field]);
  };

  return (
    // <View style={{ overflow: "scroll" }}>
    <View style={{ overflow: "scroll" }}>
      <ThemedTitle>{trigger.name}</ThemedTitle>
      <Divider />
      <TextInputDesc
        marginTop={10}
        text="Name"
        value={name}
        description="Use sentence case capitalization — no period"
        onTextChanged={(nextValue) => setName(nextValue)}
      />
      <TextInputDesc
        marginTop={10}
        text="Description"
        value={description}
        description="Must be a complete sentence starting with “This trigger fires” and ending with a period"
        onTextChanged={(nextValue) => setDescription(nextValue)}
      />
      <VStack>
        <ThemedTitle>Endpoint</ThemedTitle>
        <InputGroup>
          <InputLeftAddon children={"https://"} />
          <Input value={endpointPath} onChangeText={handleInput} />
        </InputGroup>
        <Text>
          API endpoint for this trigger. Must be in snake_case and begin with a
          letter.
        </Text>
      </VStack>
      <Divider />
      <HStack justifyContent="center" alignItems="space-between">
        <Pressable>
          <Text>Delete trigger</Text>
        </Pressable>
        <Button>Save</Button>
      </HStack>
      <Box>
        <ThemedTitle>Trigger fields</ThemedTitle>
        <Text>
          To make triggers as relevant to the user as possible you can let users
          provide one or more trigger fields. For example, the "New tweet by you
          with hashtag" trigger would require a trigger field to specify the
          hashtag to look for. Read the full documentation on trigger fields.
        </Text>

        {triggerFields && <FlatList />}

        <Button onPress={() => setShowTriggerFields(true)}>
          Add trigger fields
        </Button>

        {showTriggerFields && (
          <TriggerFieldInput
            onSave={handleSaveTriggerField}
            code={code}
            cancelCode={cancelCode}
          />
        )}
        <Divider />
      </Box>
    </View>
  );
};
