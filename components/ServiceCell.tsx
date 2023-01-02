import * as React from "react";
import { Box, Pressable, Text, Spacer } from "native-base";

interface ServiceCellProps {
  item: any;
  handleItemClick: (item: any) => void;
}

export const ServiceCell: React.FC<ServiceCellProps> = ({
  item,
  handleItemClick,
}) => {
  return (
    <Pressable
      w="full"
      h="50"
      justifyContent="center"
      alignItems="flex-start"
      borderBottomWidth="1"
      borderColor="muted.500"
      _dark={{ borderColor: "muted.50" }}
      onPress={() => handleItemClick(item)}
    >
      <Box>
        <Text>{item?.name}</Text>
        <Spacer />
      </Box>
    </Pressable>
  );
};
