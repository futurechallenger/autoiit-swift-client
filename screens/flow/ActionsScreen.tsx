import * as React from 'react';
import { View, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

export const ActionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <Text>Actions</Text>
    </View>
  );
};
