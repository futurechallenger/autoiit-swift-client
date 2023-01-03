import * as React from "react";
import {
  Pressable,
  Box,
  HStack,
  Button,
  Input,
  View,
  Text,
  FlatList,
  Spinner,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { exploreService } from "../redux/gql/searchService";

import { REQUEST_COUNT } from "../Lib/config";
import { ServiceCell } from "../components/ServiceCell";

const { useState } = React;

export const SearchScreen = () => {
  const [showMostSearched, setShowMostSearched] = useState(true);
  const navigation = useNavigation();
  const mostSearchedServices = useAppSelector(
    (state: RootState) => state.mostSearchedServices.services
  );
  const dispatch = useAppDispatch();
  const { services, error, status } = useAppSelector(
    (state: RootState) => state.exploreServices
  );

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSelect = (selected: any) => {
    console.log(">>SELECTED: ", selected);
    dispatch(
      exploreService({
        count: REQUEST_COUNT,
        sinceId: null,
        untilId: null,
        name: selected?.name,
      })
    );
    setShowMostSearched(false);
  };

  return (
    <View w="full" h="full">
      <HStack padding="5" justifyContent="flex-start" alignItems="center">
        <Box flex={1} paddingRight="5">
          <Input placeholder="Search" autoFocus={true} />
        </Box>
        <Button onPress={handleCancel}>Cancel</Button>
      </HStack>
      {showMostSearched && (
        <FlatList
          data={mostSearchedServices ?? []}
          renderItem={({ item }) => {
            return (
              <Pressable h="10" onPress={() => handleSelect(item)}>
                <View h="full">
                  <Text fontWeight="bold" padding="5">
                    {item?.name}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
      {!showMostSearched && (
        <FlatList
          data={services ?? []}
          renderItem={({ item }) => {
            return (
              <ServiceCell
                item={item}
                handleItemClick={(item) => console.log("item clicked", item)}
              />
            );
          }}
        />
      )}
      {status === "loading" && <Spinner />}
    </View>
  );
};
