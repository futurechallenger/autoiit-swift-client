import * as React from "react";
import { StyleSheet } from "react-native";
import { VStack, Box, View, Text, HStack, Pressable } from "native-base";

interface ChildProps {
  name: string;
  component: () => JSX.Element;
}

const { useState } = React;

interface DrawerContainerProps {
  children: Array<React.ReactElement<any, any>>;
}

export const DrawerContainer: React.FunctionComponent<DrawerContainerProps> = ({
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <HStack w="full" bg="blue.100">
      <VStack bg="pink.100" marginX="5">
        {React.Children.map(children, (child: any, i) => (
          <Pressable onPress={() => setSelectedIndex(i)}>
            <View
              marginY={5}
              style={selectedIndex === i ? { ...styles.active } : {}}
            >
              <Text>{child?.props?.name ?? ""}</Text>
            </View>
          </Pressable>
        ))}
      </VStack>
      <Box
        bg="green.100"
        w="90%"
        marginRight={10}
        justifyContent="center"
        alignItems="flex-start"
      >
        {children[selectedIndex].props?.component()}
      </Box>
    </HStack>
  );
};

export const DrawerScene: React.FunctionComponent<ChildProps> = ({
  name,
  component,
}) => {
  return (
    <View>
      <Text>{name}</Text>
      {component()}
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    borderLeftWidth: 5,
    borderColor: "#09f",
  },
});
