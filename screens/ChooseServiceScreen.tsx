import * as React from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  Pressable,
  Input,
  HStack,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { chooseService, chooseServiceSlice } from "../redux/gql/chooseServices";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { useEffect, useState } = React;

export const ChooseServiceScreen = () => {
  const navigation = useNavigation();
  const { services, error, status } = useAppSelector(
    (state: RootState) => state.chooseService
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chooseService());
  }, []);

  const [inputText, setInputText] = useState("");

  return (
    <View h="full" w="full" justifyContent="center" alignItems="center">
      <Text>Choose Service</Text>
      <HStack marginY={10}>
        <Input
          placeholder="Search"
          onChangeText={(text) => setInputText(text)}
          InputRightElement={
            <View marginRight={2}>
              <Ionicons name="search" size={20} />{" "}
            </View>
          }
        />
        <Button
          marginLeft={2}
          onPress={() => {
            console.log("OK to search");
            dispatch(chooseServiceSlice.actions.searchByName(inputText));
          }}
        >
          OK
        </Button>
      </HStack>
      <FlatList
        w="full"
        data={services ?? []}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("Triggers", { item })}>
            <View
              w="full"
              h={60}
              bg="pink.100"
              justifyContent="center"
              alignItems="center"
            >
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
