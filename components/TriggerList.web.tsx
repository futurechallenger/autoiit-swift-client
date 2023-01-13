import * as React from "react";
import { View, Text, Pressable } from "native-base";
import { TriggerInfo } from "../redux/gql/triggersSlice";

export const TriggerList = ({
  data,
  onItemClick,
}: {
  data: TriggerInfo[];
  onItemClick: (item: TriggerInfo) => void;
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
      <Pressable onPress={() => onItemClick(el)}>
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
