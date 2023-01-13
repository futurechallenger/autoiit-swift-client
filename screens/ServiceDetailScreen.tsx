import * as React from "react";
import { Icon, Button, Box, View, Text, IconButton } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getServiceById } from "../redux/gql/serviceById";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../Lib/config";

const { useEffect, useState } = React;
let popup: Window | null = null;

export const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [connection, setConnection] = useState("");
  const { service, status, error } = useAppSelector(
    (state: RootState) => state.serviceById
  );
  const route = useRoute();
  const { item, service: routeService } = route?.params ?? {};

  useEffect(() => {
    if (Platform.OS === "web") {
      window.addEventListener("message", messageHandler);

      return function cleanup() {
        if (Platform.OS === "web") {
          if (popup) {
            window.removeEventListener("message", messageHandler);
          }
        }
      };
    }
  });

  useEffect(() => {
    dispatch(getServiceById({ serviceId: routeService?.id }));
  }, [routeService.id]);

  const messageHandler = (event: MessageEvent) => {
    // if (event?.data?.indexOf("setImmediate") >= 0) {
    //   // Messages from UI framework
    //   return;
    // }

    console.log(">>> posted message: ", event);
    console.log(">>> posted message data: ", event?.data);
    if (event?.data?.source === "autoiit") {
      setConnection(event?.data?.message);
    }
  };

  const handleShareClick = () => {
    console.log("Handle share button click");
    if (Platform.OS !== "web") {
      Share.share({ message: "Autoiit" });
    }
  };

  const handleConnect = () => {
    if (Platform.OS !== "web") {
      navigation.navigate("Connect");
    } else {
      popup = window.open(
        `${SERVER_URL}/login/${service.id}/service`,
        "popUpWindow",
        "height=600,width=900,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
      );
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
        <Button maxW={200} w="160" minW={90} onPress={handleConnect}>
          {connection === "success" ? "Connected" : "Connect"}
        </Button>
      </Box>
      {status === "loading" && <Text>loading...</Text>}
    </View>
  );
};
