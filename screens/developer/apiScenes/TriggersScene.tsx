import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Divider, FlatList, HStack, Spinner, View } from "native-base";
import * as React from "react";
import { ListRenderItem, ListRenderItemInfo, Pressable } from "react-native";
import { EditableCell } from "../../../components/EditableCell";
import { NavContainer, NavScene } from "../../../components/NavContainer";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { getServiceTriggers } from "../../../redux/gql/getTriggersSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import * as Types from "../../../redux/types.generated";
import { CreateTriggerScene } from "./CreateTriggerScene";
import { TriggerDetailScene } from "./TriggerDetailScene";
import { TriggerGeneralScene } from "./TriggerGeneralScene";

const { useState, useEffect } = React;

const Stack = createNativeStackNavigator();

export const TriggersScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};
  // const { triggers, error, status } = useAppSelector(
  //   (state: RootState) => state.serviceTriggers
  // );
  // const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!serviceApi?.serviceId || !isFocused) {
  //     return;
  //   }

  //   dispatch(getServiceTriggers({ serviceId: serviceApi?.serviceId }));
  // }, [serviceApi?.serviceId, isFocused]);

  return (
    <NavContainer>
      <NavScene name="ActionList" component={TriggerGeneralScene} isDefault />
      <NavScene name="CreateAction" component={CreateTriggerScene} />
      <NavScene name="ActionDetail" component={TriggerDetailScene} />
    </NavContainer>
  );
};
