import * as React from "react";
import { View, Text } from "native-base";
import { TriggerInfo } from "../redux/gql/triggersSlice";

export const TriggerList = ({ data }: { data: TriggerInfo[] }) => {
  const items = [
    ...(data ?? []),
    {
      name: undefined,
      description: undefined,
    },
  ];

  const renderItem = () => {
    return items.map((el: any) => (
      <View
        justifyContent="center"
        alignItems="center"
        w="100"
        h="100"
        bg="amber.100"
      >
        <Text>{el.name ?? "Suggest a trigger"}</Text>
      </View>
    ));
  };
  return (
    <View w="full" h="full" flexDirection="row">
      {renderItem()}
    </View>
  );
};
