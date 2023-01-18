import * as React from "react";
import { Box, Button, View, Text, Divider } from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import {
  ThemedDescription,
  ThemedTitle,
} from "../../../components/ThemedTitle";
import { StyleSheet } from "react-native";

export const SearchItemsScene = () => {
  return (
    <View>
      <ThemedTitle>Search Items</ThemedTitle>
      <Divider marginTop="5" />
      <ThemedDescription>
        Add keywords that describe your service to help make search results more
        accurate. If your service has an acronym or shorthand name, include it
        here.
      </ThemedDescription>
      <TextInputDesc
        marginTop={10}
        text="Keywords"
        numberOfLines={1}
        placeholder="home, speech, voice"
        description='Separate keywords with commas, e.g. "home,speech,voice". Max length 50 characters. Please note that changes may take up to 15 minutes to propagate.'
        onTextChanged={(items: string | undefined) => {
          console.log("Search items: ", items);
        }}
      />
      <Divider marginTop={10} />
      <Box style={styles.saveWrapper}>
        <Button style={styles.save}>Save</Button>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  save: {
    alignSelf: "flex-end",
    paddingHorizontal: "20px",
    marginTop: "20px",
  },
  saveWrapper: {
    paddingHorizontal: "20px",
  },
});
