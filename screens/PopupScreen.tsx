import * as React from "react";
import { View, Text } from "native-base";
import { WebView } from "react-native-webview";

export const PopupScreen = () => {
  return (
    <View flex="1">
      <WebView source={{ uri: "https://expo.dev" }} />
    </View>
  );
};
