import * as React from "react";

import { View, Text, Spinner, FlatList } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getTriggersByServiceId } from "../redux/gql/triggersSlice";
import { RootState } from "../redux/store";
import { TriggerList } from "../components/TriggerList";
import type { ServiceInfo } from "../redux/gql/chooseServices";

const { useEffect } = React;

export const TriggersScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  const dispatch = useAppDispatch();
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers
  );

  useEffect(() => {
    dispatch(getTriggersByServiceId({ serviceId: item.id }));
  }, []);

  return (
    <View w="full" h="full">
      <View>
        <Text>Service {item.name}</Text>
      </View>
      <View w="full" h="full" bg="green.50">
        {status === "loading" ? (
          <Spinner size="lg" />
        ) : (
          <TriggerList data={triggers} />
        )}
      </View>
    </View>
  );
};
