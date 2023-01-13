import * as React from "react";
import { FlatList, View, Text } from "native-base";
import type { TriggerInfo } from "../redux/gql/triggersSlice";

export const TriggerList = ({ data }: { data: TriggerInfo[] }) => {
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
          <View>
            <Text>{item.name}</Text>
          </View>
        );
      }}
    />
  );
};
