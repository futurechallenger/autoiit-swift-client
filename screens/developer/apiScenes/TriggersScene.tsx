import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Spinner,
  HStack,
  Divider,
} from "native-base";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { getServiceTriggers } from "../../../redux/gql/getTriggersSlice";
import { addServiceTrigger } from "../../../redux/gql/addTriggerSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CreateTriggerScene } from "./CreateTriggerScene";
import { ListRenderItem, ListRenderItemInfo, Pressable } from "react-native";
import * as Types from "../../../redux/types.generated";
import { TriggerDetailScene } from "./TriggerDetailScene";
import { EditableCell } from "../../../components/EditableCell";
import { ThemedTitle } from "../../../components/ThemedTitle";

const { useState, useEffect } = React;

const Stack = createNativeStackNavigator();

export const TriggersScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!serviceApi?.serviceId || !isFocused) {
      return;
    }

    dispatch(getServiceTriggers({ serviceId: serviceApi?.serviceId }));
  }, [serviceApi?.serviceId, isFocused]);

  const handleClick = () => {
    navigation.navigate("CreateTrigger", { serviceApi });
  };

  const handleClickItem = (item: Types.ServiceTrigger) => {
    navigation.navigate("TriggerDetail", { trigger: item, serviceApi });
  };

  const renderItem: ListRenderItem<Types.ServiceTrigger> = ({
    item,
  }: ListRenderItemInfo<Types.ServiceTrigger>) => {
    return (
      <Pressable>
        <EditableCell
          title={item.name ?? ""}
          onEditClick={() => handleClickItem(item)}
        />
      </Pressable>
    );
  };

  return (
    <Stack.Navigator id="triggerScene">
      <Stack.Screen
        name="Trigger List"
        component={() => (
          <View style={{ height: "800" }}>
            <HStack
              w="full"
              marginTop={5}
              justifyContent="space-between"
              alignItems="center"
            >
              <ThemedTitle>Triggers</ThemedTitle>
              <View>
                <Button onPress={handleClick}>Add Trigger</Button>
              </View>
            </HStack>
            <Divider marginTop={5} />
            <View marginY={5}>
              <FlatList data={triggers ?? []} renderItem={renderItem} />
            </View>
            <Divider marginTop={5} />
            {status === "loading" && <Spinner size="lg" />}
          </View>
        )}
      />
      <Stack.Screen name="CreateTrigger" component={CreateTriggerScene} />
      <Stack.Screen name="TriggerDetail" component={TriggerDetailScene} />
    </Stack.Navigator>
  );
};
