import * as React from "react";
import { View, Text } from "native-base";
import { DrawerContainer, DrawerScene } from "../../components/DrawerContainer";
import { ServiceGeneralScene } from "./scenes/ServiceGeneralScene";
import { ServiceBrandingScene } from "./scenes/ServiceBrandingScene";
import { SearchItemsScene } from "./scenes/SearchItemsScene";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

export const DeveloperServiceScreen = () => {
  const { service, status, error } = useAppSelector(
    (state: RootState) => state.serviceById
  );

  return (
    <View>
      <Text>Developer Create Service Web</Text>
      <DrawerContainer>
        <DrawerScene
          name="General"
          component={ServiceGeneralScene}
          params={{ service }}
        />
        <DrawerScene name="Branding" component={ServiceBrandingScene} />
        <DrawerScene name="Search Items" component={SearchItemsScene} />
      </DrawerContainer>
    </View>
  );
};
