import * as React from "react";
import {
  Button,
  VStack,
  Divider,
  View,
  Text,
  Radio,
  HStack,
  Box,
} from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { StyleSheet } from "react-native";
import { TextInputDesc } from "../../../components/TextInputDesc";

const { useState } = React;

export const AuthScene = ({ params }: { params: any }) => {
  const { serviceApi } = params;
  const [serviceUrl, setServiceUrl] = React.useState(serviceApi?.url);

  const isFocused = useIsFocused();
  const [radioValue, setRadioValue] = useState("no-auth");
  const [clientId, setClientId] = useState(serviceApi);
  const [clientSecret, setClientSecret] = useState(serviceApi);

  console.log("Auth scene is focused: ", { isFocused });

  React.useEffect(() => {
    if (serviceApi?.url) {
      setServiceUrl(serviceApi?.url);
    }
  }, [serviceApi]);
  console.log("SERVICE API: ", serviceApi);

  const handleClick = () => {};

  const renderAuthContent = () => {
    if (radioValue === "no-auth") {
      return <Box style={{ height: "100%", width: "100%" }} />;
    } else {
      // auth-expires or auth-no-expires
      return (
        <View w="90%" marginRight="10">
          <TextInputDesc
            text="Client ID"
            description=""
            marginTop={10}
            onTextChanged={(cId) => {
              setClientId(cId);
            }}
          />
          <TextInputDesc
            text="Client Secret"
            description=""
            marginTop={10}
            onTextChanged={(cId) => {
              setClientId(cId);
            }}
          />
          <TextInputDesc
            text="Authorization URL"
            description="e.g. https://api.example.com/oauth2/authorize"
            marginTop={10}
            onTextChanged={(cId) => {
              setClientId(cId);
            }}
          />
          <TextInputDesc
            text="Token URL"
            description="e.g. https://api.example.com/oauth2/token"
            marginTop={10}
            onTextChanged={(cId) => {
              setClientId(cId);
            }}
          />
          <TextInputDesc
            text="Redirect url after authentication completes"
            description=""
            marginTop={10}
            onTextChanged={(cId) => {
              setClientId(cId);
            }}
          />
          <Divider />
          <Box alignSelf="flex-end" marginTop={15}>
            <Button w="90" onPress={handleClick}>
              Save
            </Button>
          </Box>
        </View>
      );
    }
  };

  return (
    <View style={styles.container} bg="amber.100">
      <ThemedTitle> Authentication</ThemedTitle>
      <Divider />
      <Radio.Group
        h="full"
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={radioValue}
        onChange={(nextValue) => {
          setRadioValue(nextValue);
        }}
      >
        <Radio value="no-auth" my={1}>
          My API does not require user authentication
        </Radio>
        <Radio value="auth-expires" my={1}>
          My API has users with non-expiring OAuth2 access tokens
        </Radio>
        <Radio value="auth-no-expiring" my={1}>
          My API has users with expiring OAuth2 access tokens and refresh tokens
        </Radio>
      </Radio.Group>
      {renderAuthContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
