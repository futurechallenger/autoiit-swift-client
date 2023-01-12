import * as React from "react";

import { View, Text } from "native-base";
import { useRoute } from "@react-navigation/native";

export const TriggersScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <View>
      <Text>Triggers Screen {item.name}</Text>
    </View>
  );
};
