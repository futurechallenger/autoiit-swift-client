import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, IconButton, Text, View } from 'native-base';
import * as React from 'react';
import { Platform, Share } from 'react-native';
import { ServiceTab } from '../components/ServiceTab';
import { SERVER_URL } from '../lib/config';
import { getServiceAuth } from '../redux/gql/getServiceAuthBySlice';
import { getServiceFullInfo } from '../redux/gql/serviceFullInfo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const Tab = createBottomTabNavigator();

const { useEffect, useState } = React;
let popup: Window | null = null;

export const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [connection, setConnection] = useState('');
  const {
    service: serviceInfo,
    flows,
    triggers,
    status,
    error,
  } = useAppSelector((state: RootState) => state.serviceFullInfo);
  const {
    serviceAuth,
    status: getAuthStatus,
    error: getAuthError,
  } = useAppSelector((state: RootState) => state.getServiceAuth);
  const route = useRoute();
  const { item, service: routeService } = route?.params ?? {};

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
    dispatch(getServiceFullInfo({ serviceId: routeService?.id }));
    dispatch(getServiceAuth({ serviceId: routeService?.id }));
  }, [routeService.id]);

  const messageHandler = (event: MessageEvent) => {
    if (event?.data?.source === 'autoiit') {
      setConnection(event?.data?.message);
    }
  };

  const handleShareClick = () => {
    if (Platform.OS !== 'web') {
      Share.share({ message: 'Autoiit' });
    }
  };

  const handleConnect = () => {
    if (Platform.OS !== 'web') {
      navigation.navigate('Connect');
    } else {
      popup = window.open(
        `${SERVER_URL}/login/${service.id}/service`,
        'popUpWindow',
        'height=600,width=900,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
      );
    }
  };

  const renderConnectionButton = () => {
    if (serviceAuth) {
      return (
        <Button maxW={200} w="160" minW={90} onPress={handleConnect}>
          {connection === 'success' ? 'Connected' : 'Connect'}
        </Button>
      );
    }
  };

  return (
    <View justifyContent="center" alignItems="center" w="full">
      <Box
        paddingX="5"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <View w="10" h="10" />
        <IconButton
          icon={<Ionicons name="ios-share-outline" size={32} />}
          borderRadius="full"
          onPress={handleShareClick}
        />
      </Box>
      <Box padding="5">
        <Text>{serviceInfo?.description}</Text>
      </Box>
      <Box>{renderConnectionButton()}</Box>
      {status === 'loading' && <Text>loading...</Text>}
      <ServiceTab
        selected={0}
        onSelectedChanged={(index) => console.log(`${index} is selected`)}
        flows={flows}
        triggers={triggers}
      />
    </View>
  );
};
