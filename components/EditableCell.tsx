import * as React from "react";
import { HStack, Button, View, Text } from "native-base";
import { StyleSheet } from "react-native";

interface EditableCellProps {
  title: string;
  onEditClick?: () => void;
}

export const EditableCell: React.FunctionComponent<EditableCellProps> = ({
  title,
  onEditClick,
}) => {
  return (
    <View style={styles.container}>
      <HStack
        bg="muted.50"
        w="full"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{title}</Text>
        <View flex={1} />
        <Button
          onPress={() => {
            if (onEditClick) onEditClick();
          }}
        >
          Edit
        </Button>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
});
