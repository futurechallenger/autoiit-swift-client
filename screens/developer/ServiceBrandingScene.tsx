import * as React from "react";
import { Button, View, Text, Divider, VStack, HStack } from "native-base";
import { TextInputDesc } from "../../components/TextInputDesc";

export const ServiceBrandingScene = () => {
  const [brandColor, setBrandColor] = React.useState("");

  return (
    <View>
      <Text>Branding</Text>
      <Divider />
      <VStack>
        <TextInputDesc
          marginTop={10}
          text="Service name"
          numberOfLines={1}
          description="Your product name or service name"
          onTextChanged={(colorValue: string | undefined) => {
            setBrandColor(colorValue ?? "");
          }}
        />
        <VStack>
          <Text>Flow logo</Text>
          <Text>
            The Applet logo is a simplified version of your logo that will be
            placed on your brand color.
          </Text>
          <View>
            <Button>Upload a file</Button>
          </View>
          <Text>SVG must be 620px × 620px.</Text>
          <Text>
            Download the brand logo template for Sketch, Illustrator, or
            Photoshop.
          </Text>
          <Divider />
          <HStack>
            <View>
              <Text>
                Your brand color and Applet logo help to represent your service
              </Text>
              <Text>name of your flow</Text>
            </View>
            <View>
              <Text>
                Your Applet logo appears in the bottom right corner of Applets
                that use your service
              </Text>
              <Text>name of your flow</Text>
            </View>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
};
