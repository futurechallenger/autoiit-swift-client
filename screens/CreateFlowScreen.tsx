import * as React from "react";
import { View, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const VerticalDivider = () => {
  return <View width="2" h="16" bg="red.500" />;
};

export const CreateFlowScreen = () => {
  const navigation = useNavigation();

  return (
    <View h="full" w="full" justifyContent="flex-start" alignItems="center">
      <View
        bg="yellow.300"
        minW="50%"
        width="300"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius="10"
        marginTop="10"
      >
        <Text fontSize="60" marginRight="10" marginY="5">
          When
        </Text>
        <Button onPress={() => navigation.navigate("ChooseService")}>
          Add
        </Button>
      </View>
      <VerticalDivider />
      <View
        bg="yellow.300"
        minW="50%"
        width="300"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius="10"
      >
        <Text fontSize="60" marginRight="10" marginY="5">
          Then
        </Text>
        <Button>Add</Button>
      </View>
    </View>
  );
};
