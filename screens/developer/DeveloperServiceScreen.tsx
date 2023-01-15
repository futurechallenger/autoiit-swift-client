import * as React from "react";
import { View, Text } from "native-base";
import { DrawerContainer, DrawerScene } from "../../components/DrawerContainer";
import { ServiceGeneralScene } from "./ServiceGeneralScene";
import { ServiceBrandingScene } from "./ServiceBrandingScene";

export const DeveloperServiceScreen = () => {
  return (
    <View>
      <Text>Developer Create Service Web</Text>
      <DrawerContainer>
        <DrawerScene name="General" component={ServiceGeneralScene} />
        <DrawerScene name="Branding" component={ServiceBrandingScene} />
      </DrawerContainer>
    </View>
  );
};
