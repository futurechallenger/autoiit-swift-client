import * as React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Button,
  HStack,
  Select,
  CheckIcon,
  Spinner,
} from "native-base";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DeveloperServiceScreen } from "./DeveloperServiceScreen";
import { DeveloperServiceAPIScreen } from "./DeveloperServiceAPIScreen";
import { DeveloperFlowScreen } from "./DeveloperFlowScreen";

import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { getServicesByUserId } from "../../redux/gql/servicesByUserIdSlice";
import { ThemedPicker } from "../../components/ThemedPicker";
import { getServiceById } from "../../redux/gql/serviceById";

const { useState, useEffect } = React;

const Tab = createMaterialTopTabNavigator();

export const DeveloperScreen = () => {
  const dispatch = useAppDispatch();
  const {
    services: userServices,
    status,
    error,
  } = useAppSelector((state: RootState) => state.userServices);
  const {
    service: serviceDetail,
    status: serviceStatus,
    error: serviceError,
  } = useAppSelector((state: RootState) => state.serviceById);
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("NewService");
  };

  const [itemId, setItemId] = useState<string>("");
  useEffect(() => {
    dispatch(getServicesByUserId());
  }, []);

  return (
    <View>
      <HStack style={styles.header}>
        <HStack style={styles.service}>
          <Text fontSize="2xl" marginRight="5">
            Service
          </Text>
          <ThemedPicker
            options={userServices}
            placeholder="Choose a service"
            onSelectChange={(index: number | undefined) => {
              console.log("Selected index: ", index);
              if (index) {
                dispatch(getServiceById({ serviceId: index }));
              }
            }}
          />
        </HStack>

        <View style={styles.create}>
          <Button onPress={handleClick}>Create Service</Button>
        </View>
      </HStack>

      <Tab.Navigator>
        <Tab.Screen name="Service" component={DeveloperServiceScreen} />
        <Tab.Screen name="API" component={DeveloperServiceAPIScreen} />
        <Tab.Screen name="Flows" component={DeveloperFlowScreen} />
      </Tab.Navigator>

      {status === "loading" ||
        (serviceStatus === "loading" && <Spinner size="lg" />)}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  create: {
    alignSelf: "flex-start",
  },
  service: {
    justifyContent: "center",
    alignItems: "center",
  },
});
