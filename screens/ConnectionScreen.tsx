import * as React from 'react';

import {
  View,
  Text,
  Spinner,
  FlatList,
  Divider,
  Box,
  Button,
} from 'native-base';
import { useRoute } from '@react-navigation/native';

export const ConnectionScreen = () => {
  const route = useRoute();
  const { item, service: routeService } = route?.params ?? {};

  const handleClick = () => {
    console.log('Handle click `connection` button');
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
