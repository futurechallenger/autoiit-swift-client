import * as React from "react";
import { FlatList, View, Text, Pressable } from "native-base";
import type { TriggerInfo } from "../redux/gql/triggersSlice";

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
