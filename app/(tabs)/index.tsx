import { GestureResponderEvent, ListRenderItem, ListRenderItemInfo, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { MainTabScreenProps } from '@/types';
import {
  Spinner,
  Box,
  ZStack,
  Pressable,
  Button,
  FlatList,
  Spacer,
  // Toast,
} from 'native-base';
import type { ServiceInfo } from '@/redux/gql/chooseServices';
import React, { useContext, useEffect } from 'react';
// import { useRoute } from '@react-navigation/native';
import { Router } from 'expo-router';
import { AuthContext } from '@/navigation/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServiceInfo } from '@/redux/gql/serviceInfoService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { clearToken as clearLoginToken } from '@/redux/gql/loginService';
import { clearToken as clearSignInToken } from '@/redux/gql/signInService';
import { ServiceCell } from '@/components/ServiceCell';
import { useSession } from '@/hooks/ctx';

export default function MyFlowScreen({ navigation }: MainTabScreenProps<'MyFlow'>) {
  const { signOut } = useSession();
  const { services, status, error } = useAppSelector((state: RootState) => state.serviceInfo);
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);
  // const route = useRoute();

  // const { refresh = false } = route?.params ?? {};

  // useEffect(() => {
  //   dispatch(getServiceInfo({ type: 'RECOMMENDED' }));
  // }, [refresh]);

  const handleItemClick = (item: any) => {
    if (!item.connected) navigation.navigate('ServiceDetail', { service: item });
  };

  const renderItem: ListRenderItem<ServiceInfo> = ({ item }: ListRenderItemInfo<ServiceInfo>) => {
    return <ServiceCell item={item} handleItemClick={handleItemClick} />;
  };

  if (error) {
    // TODO: show error message
    // Toast.show({ description: error });
    if (
      error === 'Signature has expired' ||
      error === 'Signature verification failed' ||
      error === 'Token expired'
    ) {
      AsyncStorage.setItem('@token', '');
      authContext.setAuthToken('');
      dispatch(clearSignInToken());
      dispatch(clearLoginToken());
    }
  }

  return (
    <View style={styles.container}>
      <ZStack justifyContent="center" alignItems="center" bg="primary.100" w="full" h="full">
        {/* <FlatList
          w="full"
          h="full"
          paddingX={5}
          data={services ?? []}
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={<ListFooter />}
          renderItem={renderItem}
        /> */}
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          Sign Out
        </Text>
        {status === 'loading' && <Spinner size="lg" />}
        {error && console.error('ERROR', error)}
      </ZStack>
    </View>
  );
}

const ListHeader = () => {
  return (
    <Box
      minHeight="30"
      justifyContent="center"
      alignItems="flex-start"
      borderBottomWidth="1"
      borderColor="muted.500"
    >
      <Text>Introduction</Text>
    </Box>
  );
};

const ListFooter = () => {
  return (
    <Box justifyContent="center" h="60" maxWidth="120" w="full" alignSelf="center">
      <Button onPress={() => console.warn('Not implemented!!!')}>Create</Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
