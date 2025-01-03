import * as React from "react";
import { StyleSheet } from "react-native";
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
          <>
            <Text style={styles.contentTitle}>
              Popular workflows & automations
            </Text>
            {flows?.map((f) => (
              <View style={styles.details} bg="emerald.100">
                <Text>{f.id}</Text>
              </View>
            ))}
          </>
        );

      case 1:
        return (
          <>
            <Text style={styles.contentTitle}>Details</Text>
            {triggers.map((t) => (
              <View style={styles.details} bg="emerald.100">
                <Text>{t.name}</Text>
              </View>
            ))}
          </>
        );
    }
  };

  return (
    <Box
      w="full"
      bg="lime.100"
      justifyContent="flex-start"
      alignItems="center"
      paddingX="8"
    >
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
            <Text
              style={
                selectedIndex === 0
                  ? { ...styles.barTitle, ...styles.highlightTitle }
                  : styles.barTitle
              }
            >
              Applets
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedIndex(1);
            onSelectedChanged(1);
          }}
        >
          <View>
            <Text
              style={
                selectedIndex === 1
                  ? { ...styles.barTitle, ...styles.highlightTitle }
                  : styles.barTitle
              }
            >
              Details
            </Text>
          </View>
        </Pressable>
      </HStack>
      <Box w="full" style={styles.content}>
        {renderScene()}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  details: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  contentTitle: {
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },
  barTitle: {
    fontWeight: "700",
    color: "rgba(0,0,0,.5);",
  },
  highlightTitle: { color: "#222" },
});
