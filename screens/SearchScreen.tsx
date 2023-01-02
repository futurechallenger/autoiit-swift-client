import * as React from "react";
import { Input, View, Text } from "native-base";

export const SearchScreen = () => {
  return (
    <View>
      <Text>Search</Text>
      <Input placeholder="Search" autoFocus={true} />
    </View>
  );
};
