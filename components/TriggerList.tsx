import * as React from "react";
import { FlatList, View, Text, Pressable } from "native-base";
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
    } as Types.ServiceTrigger,
  ];

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        return (
          <Pressable
            key={item.name ?? "empty"}
            onPress={() => onItemClick(item)}
          >
            <View>
              <Text>{item.name ?? "Suggest a trigger"}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};
