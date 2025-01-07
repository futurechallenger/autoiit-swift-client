import * as React from "react";
import { View, Text } from "react-native";
import ProfileImage from "@/assets/images/profile.svg";

export const DefaultAvatar = () => {
  return (
    <View>
      <Text>avatar</Text>
      <ProfileImage width={200} height={200} />
    </View>
  );
};
