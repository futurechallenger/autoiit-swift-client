import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Input, HStack, View, Text, Divider } from "native-base";

interface TextInputDescProps {
  text: string;
  numberOfLines?: number;
  description: string;
}

export const TextInputDesc: React.FunctionComponent<TextInputDescProps> = ({
  text,
  numberOfLines,
  description,
}) => {
  return (
    <Box style={styles.container}>
      <Text>{text ?? ""}</Text>
      <Input numberOfLines={numberOfLines ?? 0} placeholder="" />
      <Text>{description ?? ""}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
