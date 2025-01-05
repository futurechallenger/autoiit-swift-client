import * as React from "react";
import { View, Spinner } from "native-base";
import { StyleSheet } from "react-native";

interface ThemedSpinnerProps {
  size?: string;
}

export const ThemedSpinner: React.FunctionComponent<ThemedSpinnerProps> = ({
  size,
}) => {
  return (
    <View style={styles.spinner}>
      <Spinner size={size ?? "lg"} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
