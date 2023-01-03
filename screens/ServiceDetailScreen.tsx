import * as React from "react";
import { View, Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getServiceById } from "../redux/gql/serviceById";

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

  return (
    <View>
      <Text>Service Detail</Text>
      <Text>{service?.description}</Text>
      <Text>{item?.name ?? "No service"}</Text>
      {status === "loading" && <Text>loading...</Text>}
    </View>
  );
};
