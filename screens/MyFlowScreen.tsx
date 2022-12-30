import {
  GestureResponderEvent,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";

import { Text, View } from "../components/Themed";
import { MainTabScreenProps } from "../types";
import {
  Spinner,
  Box,
  ZStack,
  Pressable,
  Button,
  FlatList,
  Spacer,
} from "native-base";
import type { ServiceInfo } from "../redux/gql/serviceInfoService";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  serviceInfoSlice,
  getServiceInfo,
} from "../redux/gql/serviceInfoService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

export default function TabOneScreen({
  navigation,
}: MainTabScreenProps<"MyFlow">) {
  // const { data, error, isFetching } = useGetServicesQuery({
  //   type: "RECOMMENDED",
  // });
  const { services, status, error } = useAppSelector(
    (state: RootState) => state.serviceInfo
  );
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    dispatch(getServiceInfo({ type: "RECOMMENDED" }));
  }, []);

  const handleItemClick = (item: GestureResponderEvent) => {
    console.log("Item clicked", item);
  };

  const renderItem: ListRenderItem<ServiceInfo> = ({
    item,
  }: ListRenderItemInfo<ServiceInfo>) => {
    return (
      <Box
        w="full"
        h="50"
        justifyContent="center"
        alignItems="flex-start"
        borderBottomWidth="1"
        borderColor="muted.500"
        _dark={{ borderColor: "muted.50" }}
      >
        <Pressable onPress={handleItemClick}>
          <Text>{item?.name}</Text>
        </Pressable>
        <Spacer />
      </Box>
    );
  };

  if (error) {
    if (error.indexOf("Signature has expired") >= 0) {
      AsyncStorage.setItem("@token", "");
      authContext.setAuthToken("");
    }
  }

  return (
    <View style={styles.container}>
      <ZStack
        justifyContent="center"
        alignItems="center"
        bg="primary.100"
        w="full"
        h="full"
      >
        <FlatList
          w="full"
          h="full"
          paddingX={5}
          data={services ?? []}
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={<ListFooter />}
          renderItem={renderItem}
        />
        <Spinner size="lg" />
        {error && console.error("ERROR", error)}
      </ZStack>
    </View>
  );
}

const ListHeader = () => {
  return (
    <Box
      minHeight="30"
      justifyContent="center"
      alignItems="flex-start"
      borderBottomWidth="1"
      borderColor="muted.500"
    >
      <Text>Introduction</Text>
    </Box>
  );
};

const ListFooter = () => {
  return (
    <Box
      justifyContent="center"
      h="60"
      maxWidth="120"
      w="full"
      alignSelf="center"
    >
      <Button>Create</Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
