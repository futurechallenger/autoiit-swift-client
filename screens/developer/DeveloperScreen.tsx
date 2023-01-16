import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button, HStack } from "native-base";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DeveloperServiceScreen } from "./DeveloperServiceScreen";
import { DeveloperServiceAPIScreen } from "./DeveloperServiceAPIScreen";
import { DeveloperFlowScreen } from "./DeveloperFlowScreen";

import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export const DeveloperScreen = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("NewService");
  };

  return (
    <View>
      <HStack style={styles.header}>
        <Text>Service</Text>
        <View style={styles.create}>
          <Button onPress={handleClick}>Create Service</Button>
        </View>
      </HStack>

      <Tab.Navigator>
        <Tab.Screen name="Service" component={DeveloperServiceScreen} />
        <Tab.Screen name="API" component={DeveloperServiceAPIScreen} />
        <Tab.Screen name="Flows" component={DeveloperFlowScreen} />
      </Tab.Navigator>
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
});
