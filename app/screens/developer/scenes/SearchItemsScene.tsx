import * as React from "react";
import { Box, Button, View, Text, Divider, Spinner } from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import {
  ThemedDescription,
  ThemedTitle,
} from "../../../components/ThemedTitle";
import { StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { updateService } from "../../../redux/gql/updateServiceSlice";
import { ServiceInfo } from "../../../redux/gql/chooseServices";

const { useState } = React;

export const SearchItemsScene = ({
  params,
}: {
  params: { service: ServiceInfo };
}) => {
  const { service } = params ?? {};
  const [searchItems, setSearchItems] = useState<string | undefined>("");
  const dispatch = useAppDispatch();
  const {
    service: newService,
    status,
    error,
  } = useAppSelector((state: RootState) => state.updateService);

  const handleSave = () => {
    dispatch(
      updateService({
        id: service.id,
        name: service.name,
        desc: undefined,
        searchItems,
      })
    );
  };

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
          setSearchItems(items);
        }}
      />
      <Divider marginTop={10} />
      <Box style={styles.saveWrapper}>
        <Button style={styles.save} onPress={handleSave}>
          Save
        </Button>
      </Box>
      {status === "loading" && <Spinner size="lg" />}
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
