import * as React from "react";
import { View, Text, Pressable } from "native-base";
import * as Types from "../redux/types.generated";

export const TriggerList = ({
  data,
  onItemClick,
}: {
  data: Types.ServiceTrigger[];
  onItemClick: (item: Types.ServiceTrigger) => void;
}) => {
  const items = [
    ...(data ?? []),
    {
      name: undefined,
      description: undefined,
    },
  ];

  const renderItem = () => {
    return items.map((el: any) => (
      <Pressable key={el.name ?? "empty"} onPress={() => onItemClick(el)}>
        <View
          justifyContent="center"
          alignItems="center"
          w="100"
          h="100"
          bg="amber.100"
        >
          <Text>{el.name ?? "Suggest a trigger"}</Text>
        </View>
      </Pressable>
    ));
  };
  return (
    <View
      w="full"
      h="full"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      {renderItem()}
    </View>
  );
};
