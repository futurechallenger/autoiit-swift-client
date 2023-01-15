import * as React from "react";
import { View, Text, Box, HStack, Pressable } from "native-base";
import type { AutoFlowInfo } from "../redux/gql/serviceFullInfo";

const { useState } = React;

interface ServiceTabProps {
  selected: number;
  onSelectedChanged: (selectedIndex: number) => void;
  flows: AutoFlowInfo[] | undefined;
  triggers: any[];
}

export const ServiceTab: React.FC<ServiceTabProps> = ({
  selected = 0,
  onSelectedChanged,
  flows,
  triggers,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(selected);

  const renderScene = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <View>
            <Text>Applets</Text>
            {flows?.map((f) => (
              <View>
                <Text>{f.id}</Text>
              </View>
            ))}
          </View>
        );

      case 1:
        return (
          <View>
            <Text>Details</Text>
            {triggers.map((t) => (
              <View>
                <Text>{t.name}</Text>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <Box>
      <HStack
        w="140"
        justifyContent="space-around"
        alignItems="center"
        bg="amber.100"
      >
        <Pressable
          onPress={() => {
            setSelectedIndex(0);
            onSelectedChanged(0);
          }}
        >
          <View>
            <Text>Applets</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedIndex(1);
            onSelectedChanged(1);
          }}
        >
          <View>
            <Text>Details</Text>
          </View>
        </Pressable>
      </HStack>
      {renderScene()}
    </Box>
  );
};
