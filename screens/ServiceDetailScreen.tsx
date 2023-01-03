import * as React from "react";
import { View, Text } from "native-base";
import { useRoute } from "@react-navigation/native";

export const ServiceDetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <View>
      <Text>Service Detail</Text>
      <Text>{item?.name ?? "No service"}</Text>
    </View>
  );
};
