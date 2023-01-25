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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addServiceTrigger } from "../../../redux/gql/addTriggerSlice";
import { RootState } from "../../../redux/store";
import { ThemedSpinner } from "../../../components/ThemedSpinner";

const { useState, useEffect } = React;

export const CreateTriggerScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};
  const [refreshed, setRefreshed] = useState(false);
  const [triggerName, setTriggerName] = useState();
  const [description, setDescription] = useState();
  const [endpoint, setEndpoint] = useState("api");
  const [endpointPath, setEndpointPath] = useState<string | undefined>();

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const { trigger, status, error } = useAppSelector(
    (state: RootState) => state.addTrigger
  );

  useEffect(() => {
    if (isFocused && !refreshed) {
      setRefreshed(true);
    }
  }, [isFocused]);

  const handleClick = () => {
    dispatch(
      addServiceTrigger({
        serviceTrigger: {
          name: triggerName,
          description,
          endpointPath,
          endpointType: endpoint === "api" ? 0 : 1,
          serviceApiId: serviceApi?.id,
          fields: [],
        },
      })
    );
  };

  const handleInput = (input: string) => {
    setEndpointPath(input);
  };

  return (
    <View bg="green.50" h="full">
      <ThemedTitle>Create new trigger</ThemedTitle>

      <Divider />
      <TextInputDesc
        marginTop={10}
        subTitle="Name"
        text=""
        value={triggerName}
        placeholder=""
        description="Use sentence case capitalization — no period"
        onTextChanged={(value) => setTriggerName(value)}
      />
      <TextInputDesc
        marginTop={10}
        subTitle="Description"
        text=""
        value={description}
        placeholder=""
        description="Must be a complete sentence starting with “This trigger fires” and ending with a period"
        onTextChanged={(value) => setDescription(value)}
      />
      <VStack>
        <ThemedTitle>Endpoint</ThemedTitle>
        <Radio.Group
          name="endpoint"
          value={endpoint}
          onChange={(nextValue) => setEndpoint(nextValue)}
        >
          <Radio value="api">API</Radio>
          <Radio value="feed">Feed(RSS or Atom)</Radio>
        </Radio.Group>
      </VStack>
      {endpoint === "api" && (
        <InputGroup>
          <InputLeftAddon children={"https://"} />
          <Input value={endpointPath} onChangeText={handleInput} />
          <Text>
            API endpoint for this trigger. Must be in snake_case and begin with
            a letter.
          </Text>
        </InputGroup>
      )}

      <Divider />
      <HStack>
        <Button onPress={handleClick}>Save</Button>
      </HStack>
      {status === "loading" && <ThemedSpinner />}
    </View>
  );
};
