import * as React from "react";
import { Button, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

const { useEffect } = React;

export const CreateServiceScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => <Button onPress={handleCancel}>Cancel</Button>,
    // });
  }, []);

  const handleCancel = () => {
    console.log("Cancel clicked");
    navigation.goBack();
  };

  return (
    <View>
      <Text>Create</Text>
    </View>
  );
};
