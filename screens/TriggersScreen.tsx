import * as React from "react";

import { View, Text, Spinner, FlatList } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { TriggerList } from "../components/TriggerList";
import { useNavigation } from "@react-navigation/native";
import * as Types from "../redux/types.generated";
import { getServiceTriggers } from "../redux/gql/getTriggersSlice";

const { useEffect } = React;

export const TriggersScreen = () => {
  const route = useRoute();
  const { item: service } = route.params;

  const dispatch = useAppDispatch();
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers
  );

  useEffect(() => {
    dispatch(getServiceTriggers({ serviceId: service.id }));
  }, []);

  const navigation = useNavigation();

  const handleItemClick = (item: Types.ServiceTrigger) => {
    navigation.navigate("ServiceDetail", { item, service });
  };

  return (
    <View w="full" h="full">
      <View>
        <Text>Service {service.name}</Text>
      </View>
      <View w="full" h="full" bg="green.50">
        {status === "loading" ? (
          <Spinner size="lg" />
        ) : (
          <TriggerList data={triggers ?? []} onItemClick={handleItemClick} />
        )}
      </View>
    </View>
  );
};
