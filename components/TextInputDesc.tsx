import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Input, HStack, View, Text, Divider } from "native-base";

interface TextInputDescProps {
  text: string;
  numberOfLines?: number;
  description: string;
  marginTop: number | string;
  onTextChanged: (text: string | undefined) => void;
}

export const TextInputDesc: React.FunctionComponent<TextInputDescProps> = ({
  text,
  numberOfLines,
  description,
  marginTop,
  onTextChanged,
}) => {
  return (
    <Box style={{ ...styles.container, marginTop }}>
      <Text>{text ?? ""}</Text>
      <Input
        numberOfLines={numberOfLines ?? 0}
        placeholder=""
        onChangeText={onTextChanged}
      />
      <Text>{description ?? ""}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
