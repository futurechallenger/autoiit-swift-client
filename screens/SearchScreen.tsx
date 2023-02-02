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
import { ServiceInfo } from "../redux/gql/chooseServices";

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
    dispatch(
      exploreService({
        count: REQUEST_COUNT,
        sinceId: null,
        untilId: null,
        name: selected?.serviceType,
      })
    );
    setShowMostSearched(false);
  };

  const handleItemPress = (item: ServiceInfo) => {
    if (!item.connected) {
      navigation.navigate("ServiceDetail", { service: item });
    }
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
                    {item?.serviceType}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
      {!showMostSearched && (
        <Box paddingX="5">
          <FlatList
            data={services ?? []}
            renderItem={({ item }) => {
              return (
                <ServiceCell item={item} handleItemClick={handleItemPress} />
              );
            }}
          />
        </Box>
      )}
      {status === "loading" && <Spinner />}
    </View>
  );
};
