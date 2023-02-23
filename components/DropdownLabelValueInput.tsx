import * as React from 'react';
import { View, Text, FlatList, HStack } from 'native-base';
import { ThemedTitle } from './ThemedTitle';

export const DropdownLabelValueInput = () => {
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <HStack>
              <ThemedTitle flex={1}>Label</ThemedTitle>
              <ThemedTitle flex={1}>Value</ThemedTitle>
            </HStack>
          );
        }}
        data={[]}
        renderItem={({ item }) => (
          <HStack>
            <Text flex={1}>{item.label}</Text>
            <Text flex={1}>{item.value}</Text>
          </HStack>
        )}
      />
    </View>
  );
};
