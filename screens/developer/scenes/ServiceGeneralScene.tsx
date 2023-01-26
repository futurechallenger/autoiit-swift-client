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
  ZStack,
} from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { updateService } from "../../../redux/gql/updateServiceSlice";
import { InputMaybe } from "../../../redux/types.generated";

const { useState } = React;

export const ServiceGeneralScene = ({ params }: { params: any }) => {
  const { service } = params ?? {};

  const [name, setName] = useState("");
  const [desc, setDesc] = useState<InputMaybe<string>>("");

  const dispatch = useAppDispatch();
  const {
    service: newService,
    status,
    error,
  } = useAppSelector((state: RootState) => state.updateService);

  const handleClick = () => {
    console.log("Service to save: ", { name, desc });
    dispatch(
      updateService({
        id: parseInt(service?.id, 10),
        name,
        desc: desc,
        searchItems: service.searchItems,
      })
    );
  };

  return (
    <View width="100%">
      <ThemedTitle>General</ThemedTitle>
      <Divider marginTop={15} />
      <VStack>
        <TextInputDesc
          marginTop={10}
          text="Service name"
          value={newService?.name ?? service?.name}
          numberOfLines={1}
          description="Your product name or service name"
          onTextChanged={(serviceName: string | undefined) => {
            setName(serviceName ?? "");
          }}
        />
        <TextInputDesc
          marginTop={10}
          text="Description"
          value={newService?.description ?? service?.description}
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
