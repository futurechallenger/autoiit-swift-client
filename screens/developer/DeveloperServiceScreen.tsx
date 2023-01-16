import * as React from "react";
import { View, Text } from "native-base";
import { DrawerContainer, DrawerScene } from "../../components/DrawerContainer";
import { ServiceGeneralScene } from "./scenes/ServiceGeneralScene";
import { ServiceBrandingScene } from "./scenes/ServiceBrandingScene";
import { SearchItemsScene } from "./scenes/SearchItemsScene";

export const DeveloperServiceScreen = () => {
  return (
    <View>
      <Text>Developer Create Service Web</Text>
      <DrawerContainer>
        <DrawerScene name="General" component={ServiceGeneralScene} />
        <DrawerScene name="Branding" component={ServiceBrandingScene} />
        <DrawerScene name="Search Items" component={SearchItemsScene} />
      </DrawerContainer>
    </View>
  );
};
