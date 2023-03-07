import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Input, HStack, View, Text, Divider } from 'native-base';
import { InputTitle, ThemedDescription, ThemedText } from './ThemedTitle';

const { useState } = React;

interface TextInputDescProps {
  text: string;
  subTitle?: string;
  value?: string;
  numberOfLines?: number;
  description: string;
  marginTop: number | string;
  placeholder?: string;
  onTextChanged: (text: string | undefined) => void;
}

export const TextInputDesc: React.FunctionComponent<TextInputDescProps> = ({
  text,
  subTitle,
  value,
  numberOfLines,
  description,
  marginTop,
  placeholder,
  onTextChanged,
}) => {
  const [inputVal, setInputVal] = useState<string | undefined>(undefined);
  return (
    <Box style={{ ...styles.container, marginTop }}>
      <InputTitle>{text ?? ''}</InputTitle>
      {subTitle && <ThemedText type="description">{subTitle}</ThemedText>}
      <Input
        value={inputVal ?? value}
        numberOfLines={numberOfLines ?? 0}
        placeholder={placeholder ?? ''}
        onChangeText={(v) => {
          setInputVal(v);
          onTextChanged(v);
        }}
      />
      <ThemedDescription>{description ?? ''}</ThemedDescription>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
