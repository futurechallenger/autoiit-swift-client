import * as React from "react";
import {
  Box,
  Button,
  HStack,
  View,
  Text,
  FlatList,
  Spinner,
  Input,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  exploreService,
  getMostSearchedServices,
} from "../redux/gql/searchService";
import { ServiceCell } from "../components/ServiceCell";
import { useNavigation } from "@react-navigation/native";
import { REQUEST_COUNT } from "../Lib/config";

const { useEffect, useState } = React;

export const ExploreScreen = () => {
  const [condition, setCondition] = useState("");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { services, error, status } = useAppSelector(
    (state: RootState) => state.exploreServices
  );
  const {
    services: mostSearchedServices,
    error: mostSearchedError,
    status: mostSearchedStatus,
  } = useAppSelector((state: RootState) => state.mostSearchedServices);
  useEffect(() => {
    dispatch(
      exploreService({
        count: REQUEST_COUNT,
        sinceId: null,
        untilId: null,
        name: condition,
      })
    );
    dispatch(getMostSearchedServices());
  }, []);

  const handleItemClick = (item: any) => {};

  const handleFocus = () => {
    navigation.navigate("Search");
  };

  return (
    <View paddingX="5">
      <FlatList
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={20}
        data={services ?? []}
        renderItem={({ item }) => (
          <ServiceCell item={item} handleItemClick={handleItemClick} />
        )}
        ListHeaderComponent={<ListHeader onSearchFocus={handleFocus} />}
        ListFooterComponent={
          status === "loading" || mostSearchedStatus === "loading" ? (
            <Spinner />
          ) : null
        }
        onEndReached={
          () => {}
          // dispatch(
          //   exploreService({
          //     count: REQUEST_COUNT,
          //     untilId: services?.[REQUEST_COUNT - 1]?.id ?? 0,
          //     sinceId: undefined,
          //     name: condition,
          //   })
          // )
        }
      />
      {status === "loading" && <Text>Loading...</Text>}
      {(error || mostSearchedError) && (
        <Text>{error || mostSearchedError}</Text>
      )}
    </View>
  );
};

const ListHeader = ({ onSearchFocus }: { onSearchFocus: () => void }) => {
  const [searching, setSearching] = useState(false);
  const [text, setText] = useState("");

  // const handleInput = (newValue: string) => {
  //   if (newValue) {
  //     if (!searching) setSearching(true);

  //     setText(newValue);
  //   }
  // };

  const handleSearchFocus = () => {
    if (onSearchFocus) onSearchFocus();
  };

  const handleClick = () => {
    if (searching) setSearching(false);
  };

  return (
    <View>
      <HStack padding={5} justifyContent="center" alignItems="center">
        <Box flex={1} paddingRight="5">
          <Input placeholder="Search" onFocus={handleSearchFocus} />
        </Box>
        {searching && <Button onPress={handleClick}>Cancel</Button>}
      </HStack>
    </View>
  );
};
