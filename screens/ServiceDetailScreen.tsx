import * as React from "react";
import { Icon, Button, Box, View, Text, IconButton } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getServiceById } from "../redux/gql/serviceById";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, Share } from "react-native";

const { useEffect } = React;

export const ServiceDetailScreen = () => {
  const dispatch = useAppDispatch();
  const { service, status, error } = useAppSelector(
    (state: RootState) => state.serviceById
  );
  const route = useRoute();
  const { item } = route.params;

  useEffect(() => {
    dispatch(getServiceById({ serviceId: item.id }));
  }, [item.id]);

  const handleShareClick = () => {
    console.log("Handle share button click");
    if (Platform.OS !== "web") {
      Share.share({ message: "Autoiit" });
    }
  };

  return (
    <View justifyContent="center" alignItems="center">
      <Box
        paddingX="5"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <View w="10" h="10" />
        <IconButton
          icon={<Ionicons name="ios-share-outline" size={32} />}
          borderRadius="full"
          onPress={handleShareClick}
        />
      </Box>
      <Box padding="5">
        <Text>{service?.description}</Text>
      </Box>
      <Box>
        <Button maxW={200} w="160" minW={90}>
          Connect
        </Button>
      </Box>
      {status === "loading" && <Text>loading...</Text>}
    </View>
  );
};
