import * as React from "react";
import { Box, Button, View, Text, Divider, VStack, HStack } from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { StyleSheet } from "react-native";
import {
  InputTitle,
  ThemedDescription,
  ThemedTitle,
} from "../../../components/ThemedTitle";

export const ServiceBrandingScene = () => {
  const [brandColor, setBrandColor] = React.useState("");

  const handleSave = () => {};

  return (
    <View style={styles.scene}>
      <ThemedTitle>Branding</ThemedTitle>
      <Divider marginTop="5" />
      <VStack>
        <TextInputDesc
          marginTop={20}
          text="Brand color"
          value={brandColor}
          subTitle="Your service’s brand color will serve as the background color on your service page and Applets."
          numberOfLines={1}
          description="Choose a brand color that your Auto-flow logo will look great on. Darker colors are preferred to bright or light colors."
          onTextChanged={(colorValue: string | undefined) => {
            setBrandColor(colorValue ?? "");
          }}
        />
        <VStack>
          <Box style={styles.flowLogo}>
            <InputTitle>Flow logo</InputTitle>
            <ThemedDescription>
              The Applet logo is a simplified version of your logo that will be
              placed on your brand color.
            </ThemedDescription>
            <View style={styles.uploadWrapper} bg="amber.100">
              <Button style={styles.upload}>Upload a file</Button>
            </View>
            <ThemedDescription>SVG must be 620px × 620px.</ThemedDescription>
            <ThemedDescription>
              Download the brand logo template for Sketch, Illustrator, or
              Photoshop.
            </ThemedDescription>
          </Box>
          <Divider marginTop="10" />
          {/* TODO: Preview of the branding */}
          {/* <HStack>
            <View>
              <ThemedDescription>
                Your brand color and Applet logo help to represent your service
              </ThemedDescription>
              <Text>name of your flow</Text>
            </View>
            <View>
              <Text>
                Your Applet logo appears in the bottom right corner of Applets
                that use your service
              </Text>
              <Text>name of your flow</Text>
            </View>
          </HStack> */}
        </VStack>
        <View>
          <Button onPress={handleSave} style={styles.save}>
            Save
          </Button>
        </View>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    width: "100%",
  },
  upload: {
    paddingHorizontal: "10px",
    alignSelf: "center",
  },
  uploadWrapper: {
    height: "100px",
    justifyContent: "flex-end",
  },
  save: {
    alignSelf: "flex-end",
    paddingHorizontal: "20px",
    marginTop: "20px",
  },
  saveWrapper: {
    paddingHorizontal: "20px",
  },
  flowLogo: {
    marginTop: "20px",
  },
});
