import * as React from "react";
import { View, Text } from "native-base";
import { DrawerContainer, DrawerScene } from "../../components/DrawerContainer";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { GeneralScene } from "./apiScenes/GeneralScene";
import { AuthScene } from "./apiScenes/AuthScene";
import { TriggersScene } from "./apiScenes/TriggersScene";
import { ActionsScene } from "./apiScenes/ActionsScene";

export const DeveloperServiceAPIScreen = () => {
  const { service, status, error } = useAppSelector(
    (state: RootState) => state.serviceById
  );

  return (
    <View>
      <Text>Developer Create Service Web</Text>
      <DrawerContainer>
        <DrawerScene
          name="General"
          component={GeneralScene}
          params={{ service }}
        />
        <DrawerScene
          name="Authentication"
          component={AuthScene}
          params={{ service }}
        />
        <DrawerScene
          name="Triggers"
          component={TriggersScene}
          params={{ service }}
        />
        <DrawerScene
          name="Actions"
          component={ActionsScene}
          params={{ service }}
        />
      </DrawerContainer>
    </View>
  );
};
