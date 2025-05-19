import { ListRenderItem, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Spinner, Box, ZStack, FlatList } from 'native-base';
import { Button } from 'react-native';
import type { ServiceInfo } from '@/redux/gql/chooseServices';
import React, { useEffect } from 'react';
import { getServiceInfo } from '@/redux/gql/serviceInfoService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { ServiceCell } from '@/components/ServiceCell';
import { signOut } from '@/redux/gql/authSlice';

export default function MyFlowScreen() {
  const { services, status, error } = useAppSelector((state: RootState) => state.serviceInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServiceInfo({ type: 'RECOMMENDED' }));
  }, []);

  useEffect(() => {
    if (!error) return;
    console.error('>>>>>>Get flows error', error);
  }, [error]);

  const handleItemClick = (item: any) => {
    // if (!item.connected) navigation.navigate('ServiceDetail', { service: item });
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
      dispatch(signOut());
    }
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Flows',
        }}
      />
      <ZStack justifyContent="center" alignItems="center" bg="primary.100" w="full" h="full">
        <FlatList
          w="full"
          h="full"
          paddingX={5}
          data={services ?? []}
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={
            <ListFooter
              pressHandler={() => {
                router.push('/create');
              }}
            />
          }
          renderItem={renderItem}
        />
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

const ListFooter = ({ pressHandler }: { pressHandler: () => void }) => {
  return (
    <Box justifyContent="center" h="60" maxWidth="120" w="full" alignSelf="center">
      <Button onPress={pressHandler} title="Create" />
    </Box>
  );
};
