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

interface Props {
  params: any;
  focusScene: boolean;
}

export const TriggersScene: React.FunctionComponent<Props> = ({
  params,
  focusScene,
}) => {
  const { serviceApi } = params ?? {};

  return (
    <NavContainer containerId="triggers-nav" needsReset={focusScene}>
      <NavScene
        name="TriggerList"
        component={TriggerGeneralScene}
        params={{ serviceApi }}
        isDefault
      />
      <NavScene name="CreateTrigger" component={CreateTriggerScene} />
      <NavScene name="TriggerDetail" component={TriggerDetailScene} />
    </NavContainer>
  );
};
