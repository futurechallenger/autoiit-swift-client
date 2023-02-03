import * as React from "react";
import {
  Button,
  View,
  Text,
  Divider,
  VStack,
  Radio,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
} from "native-base";
import { InputTitle, ThemedTitle } from "../../../components/ThemedTitle";
import { TextInputDesc } from "../../../components/TextInputDesc";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addServiceTrigger,
  resetStatus,
} from "../../../redux/gql/addTriggerSlice";
import { RootState } from "../../../redux/store";
import { ThemedSpinner } from "../../../components/ThemedSpinner";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { getServiceTriggers } from "../../../redux/gql/getTriggersSlice";

const { useState, useEffect } = React;

export const CreateTriggerScene = () => {
  const [refreshed, setRefreshed] = useState(false);
  const [triggerName, setTriggerName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [endpoint, setEndpoint] = useState("api");
  const [endpointPath, setEndpointPath] = useState<string | undefined>();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceApi } = route.params ?? {};

  const dispatch = useAppDispatch();
  const { trigger, status, error } = useAppSelector(
    (state: RootState) => state.addTrigger
  );

  useEffect(() => {
    if (isFocused && !refreshed) {
      setRefreshed(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (status === "succeeded" && serviceApi?.serviceId) {
      dispatch(resetStatus());
      navigation.goBack();
      dispatch(getServiceTriggers({ serviceId: serviceApi?.serviceId }));
    }
  }, [status, serviceApi?.serviceId]);

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
    <View bg="green.50" h="full" marginRight={20}>
      <ThemedTitle>Create a new trigger</ThemedTitle>

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
        <InputTitle>Endpoint</InputTitle>
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
        <>
          <InputGroup>
            <InputLeftAddon children={"https://"} />
            <Input value={endpointPath} onChangeText={handleInput} />
          </InputGroup>
          <Text>
            API endpoint for this trigger. Must be in snake_case and begin with
            a letter.
          </Text>
        </>
      )}

      <Divider />
      <HStack justifyContent="flex-end">
        <Button onPress={handleClick}>Save</Button>
      </HStack>
      {status === "loading" && <ThemedSpinner />}
      {error && (
        <ThemedAlert
          status="error"
          text={error ?? "Something wrong, please try again later"}
        />
      )}
    </View>
  );
};
