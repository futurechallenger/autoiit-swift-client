import * as React from "react";
import { View, Text } from "native-base";
import { useRoute } from "@react-navigation/native";

export const TriggerDetailScene = () => {
  const route = useRoute();
  const { trigger, serviceApi } = route.params ?? {};
  return (
    <View>
      <Text>Trigger Details {trigger.name}</Text>
    </View>
  );
};
