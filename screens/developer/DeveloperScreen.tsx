import * as React from "react";
import { View, Text } from "native-base";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DeveloperServiceScreen } from "./DeveloperServiceScreen";
import { DeveloperServiceAPIScreen } from "./DeveloperServiceAPIScreen";
import { DeveloperFlowScreen } from "./DeveloperFlowScreen";

const Tab = createMaterialTopTabNavigator();

export const DeveloperScreen = () => {
  return (
    <View>
      <Text>Developer Screen</Text>
      <Tab.Navigator>
        <Tab.Screen name="Service" component={DeveloperServiceScreen} />
        <Tab.Screen name="API" component={DeveloperServiceAPIScreen} />
        <Tab.Screen name="Flows" component={DeveloperFlowScreen} />
      </Tab.Navigator>
    </View>
  );
};
