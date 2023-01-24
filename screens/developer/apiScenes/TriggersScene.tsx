import * as React from "react";
import { View, Text, Button, FlatList, Spinner } from "native-base";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { getServiceTriggers } from "../../../redux/gql/getTriggersSlice";
import { addServiceTrigger } from "../../../redux/gql/addTriggerSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CreateTriggerScene } from "./CreateTriggerScene";

const { useState, useEffect } = React;

const Stack = createNativeStackNavigator();

export const TriggersScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!serviceApi?.serviceId) {
      return;
    }

    dispatch(getServiceTriggers({ serviceId: serviceApi?.serviceId }));
  }, [serviceApi?.serviceId]);

  const handleClick = () => {
    navigation.navigate("CreateTrigger");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trigger List"
        component={() => (
          <View style={{ height: "800" }}>
            <Text>Triggers Scene</Text>
            <View>
              <Button onPress={handleClick}>Add Trigger</Button>
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
        )}
      />
      <Stack.Screen name="CreateTrigger" component={CreateTriggerScene} />
    </Stack.Navigator>
  );
};
