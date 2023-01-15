import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text, VStack, Box, Pressable, FlatList } from "native-base";
import { DefaultAvatar } from "./DefaultAvatar";
import { useNavigation } from "@react-navigation/native";

const profileItems = [
  "avatar",
  "Account",
  "My services",
  "Archive",
  "Widgets",
  "Sync options",
  "Rate Autoiit",
  "Help center",
  "Sign out",
  "footer",
];

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    console.log("Item pressed");
    navigation.navigate("Account");
  };

  return (
    <VStack w="100%" h="100%">
      <FlatList
        w="full"
        data={profileItems}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View flex={1} alignSelf="center" paddingY={10}>
                <Box bg="red">
                  <Box
                    style={{
                      borderRadius: 80,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    bg="indigo.500"
                  >
                    <DefaultAvatar />
                    <Pressable
                      style={{
                        backgroundColor: "black",
                        opacity: 0.5,
                        marginTop: -40,
                        width: 130,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => console.log("Change avatar")}
                    >
                      <Text style={{ marginTop: -10 }} color="white">
                        Edit
                      </Text>
                    </Pressable>
                  </Box>
                </Box>
              </View>
            );
          } else if (index === profileItems.length - 1) {
            return (
              <View
                bg="red"
                w="full"
                h="50"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingX={5}
              >
                <Pressable>
                  <Text>Terms</Text>
                </Pressable>
                <View>
                  <Text>v0.1.1</Text>
                </View>
              </View>
            );
          } else {
            return (
              <Pressable onPress={handleItemPress}>
                <View
                  bg="fuchsia.500"
                  borderBottomWidth={1}
                  h="66"
                  justifyContent="center"
                  alignItems="flex-start"
                  paddingLeft={5}
                >
                  <View paddingRight={10} bg="red">
                    <Text fontWeight="bold" fontSize={20}>
                      {item}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </VStack>
  );
};
