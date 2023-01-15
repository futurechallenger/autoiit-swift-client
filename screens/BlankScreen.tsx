import * as React from "react";
import { View } from "native-base";
import { useNavigation } from "@react-navigation/native";

const { useEffect } = React;

export const BlankScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate("CreateService");
  });

  return <View></View>;
};
