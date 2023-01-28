import * as React from "react";
import { HStack, Button, View, Text } from "native-base";

interface EditableCellProps {
  title: string;
  onEditClick?: () => void;
}

export const EditableCell: React.FunctionComponent<EditableCellProps> = ({
  title,
  onEditClick,
}) => {
  return (
    <HStack
      bg="muted.50"
      w="full"
      h="50"
      justifyContent="center"
      alignItems="flex-start"
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
  );
};
