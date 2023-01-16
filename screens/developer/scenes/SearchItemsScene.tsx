import * as React from "react";
import { Button, View, Text, Divider } from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";

export const SearchItemsScene = () => {
  return (
    <View>
      <Text>Search Items</Text>
      <Divider />
      <Text>
        Add keywords that describe your service to help make search results more
        accurate. If your service has an acronym or shorthand name, include it
        here.
      </Text>
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
      <Button>Save</Button>
    </View>
  );
};
