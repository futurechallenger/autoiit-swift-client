import * as React from 'react';

import { SERVER_URL } from '../Lib/config';
import {
  View,
  Text,
  Spinner,
  FlatList,
  Divider,
  Box,
  Button,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';

let popup: Window | null = null;

export const ConnectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, service: routeService } = route?.params ?? {};

  const handleClick = () => {
    if (Platform.OS !== 'web') {
      navigation.navigate('Connect');
    } else {
      popup = window.open(
        `${SERVER_URL}/login/${routeService?.id}/service`,
        'popUpWindow',
        'height=600,width=900,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
      );
    }
  };
  const description = routeService?.description ?? routeService?.name ?? '';

  return (
    <View>
      <Text>{routeService?.name}</Text>
      <Divider marginTop={5} />
      <Box>
        <Text>{description}</Text>
      </Box>
      <Box marginTop={10} w="100">
        <Button onPress={handleClick}>Connect</Button>
      </Box>
    </View>
  );
};
