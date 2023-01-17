import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Input, HStack, View, Text, Divider } from "native-base";

interface TextInputDescProps {
  text: string;
  value?: string;
  numberOfLines?: number;
  description: string;
  marginTop: number | string;
  placeholder?: string;
  onTextChanged: (text: string | undefined) => void;
}

export const TextInputDesc: React.FunctionComponent<TextInputDescProps> = ({
  text,
  value,
  numberOfLines,
  description,
  marginTop,
  placeholder,
  onTextChanged,
}) => {
  return (
    <Box style={{ ...styles.container, marginTop }}>
      <Text>{text ?? ""}</Text>
      <Input
        value={value}
        numberOfLines={numberOfLines ?? 0}
        placeholder={placeholder ?? ""}
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
