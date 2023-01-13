import * as React from "react";

import { View, Text, Spinner, FlatList } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getTriggersByServiceId } from "../redux/gql/triggersSlice";
import { RootState } from "../redux/store";
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
    <View>
      <View>
        <Text>Service {item.name}</Text>
      </View>
      <View>
        {status === "loading" ? (
          <Spinner size="lg" />
        ) : (
          <FlatList
            data={triggers ?? []}
            renderItem={({ item }) => (
              <View
                w="100"
                h="100"
                bg="amber.100"
                justifyContent="center"
                alignItems="center"
              >
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};
