import * as React from 'react';

import { NavigationContainerRefContext, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Divider, FlatList, Spinner, Text, View } from 'native-base';
import { Platform } from 'react-native';
import { SERVER_URL } from '../Lib/config';
import { getServiceAuth } from '../redux/gql/getServiceAuthBySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

let popup: Window | null = null;

const { useState, useEffect } = React;

export const ConnectionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const { item, service: routeService, phrase } = route?.params ?? {};
  const [connection, setConnection] = useState('');

  const { serviceAuth, status, error } = useAppSelector((state: RootState) => state.getServiceAuth);

  useEffect(() => {
    if (!routeService?.id) {
      return;
    }

    dispatch(getServiceAuth({ serviceId: routeService?.id }));
  }, [routeService?.id]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('message', messageHandler);

      return function cleanup() {
        if (Platform.OS === 'web') {
          if (popup) {
            window.removeEventListener('message', messageHandler);
          }
        }
      };
    }
  }, []);

  useEffect(() => {
    if (connection === 'success') {
      if (phrase === 'Trigger') {
        navigation.navigate('CompleteTrigger', { trigger: item, phrase });
      } else {
        navigation.navigate('CompleteAction', { item, phrase });
      }
    }
  }, [connection]);

  const messageHandler = (event: MessageEvent) => {
    if (event?.data?.source === 'autoiit') {
      setConnection(event?.data?.message);
    }
  };

  const renderConnectionButton = () => {
    if (!serviceAuth) {
      return null;
    }

    return (
      <Button maxW={200} w="160" minW={90} onPress={handleConnect}>
        {connection === 'success' ? 'Connected' : 'Connect'}
      </Button>
    );
  };

  const handleConnect = () => {
    // if (connection === 'success') {
    //   return;
    // }
    // if (Platform.OS !== 'web') {
    //   navigation.navigate('Connect', { serviceId: routeService?.id });
    // } else {
    //   popup = window.open(
    //     `${SERVER_URL}/login/${routeService?.id}/service`,
    //     'popUpWindow',
    //     'height=600,width=900,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
    //   );
    // }

    //TODO: for test only
    if (phrase === 'Trigger') {
      navigation.navigate('CompleteTrigger', { trigger: item, phrase });
    } else {
      navigation.navigate('CompleteAction', { item, phrase });
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
        {renderConnectionButton()}
      </Box>
    </View>
  );
};
