import * as React from "react";
import { View, Text, Button, FlatList, Spinner } from "native-base";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { getServiceTriggers } from "../../../redux/gql/getTriggersSlice";

const { useState, useEffect } = React;

export const TriggersScene = ({ params }: { params: any }) => {
  const { service } = params;
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServiceTriggers({ serviceId: service?.id }));
  }, []);
  return (
    <View>
      <Text>Triggers Scene</Text>
      <View>
        <Button>Add Trigger</Button>
      </View>
      <View>
        <FlatList
          data={triggers ?? []}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
      {status === "loading" && <Spinner size="lg" />}
    </View>
  );
};
