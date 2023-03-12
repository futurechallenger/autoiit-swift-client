import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Button, HStack, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedPicker } from '../../components/ThemedPicker';
import { ThemedSpinner } from '../../components/ThemedSpinner';
import { getServiceById } from '../../redux/gql/serviceById';
import { getServicesByUserId } from '../../redux/gql/servicesByUserIdSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { DeveloperFlowScreen } from './DeveloperFlowScreen';
import { DeveloperServiceAPIScreen } from './DeveloperServiceAPIScreen';
import { DeveloperServiceScreen } from './DeveloperServiceScreen';

const { useState, useEffect } = React;

const Tab = createMaterialTopTabNavigator();

export const DeveloperScreen = () => {
  const [selectedItem, setSelectedItem] = useState<{ value: number; label: string } | undefined>();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { services: userServices, status, error } = useAppSelector((state: RootState) => state.userServices);
  const {
    service: serviceDetail,
    status: serviceStatus,
    error: serviceError,
  } = useAppSelector((state: RootState) => state.serviceById);
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('NewService');
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getServicesByUserId());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!selectedItem || !selectedItem?.value) {
      return;
    }
    dispatch(getServiceById({ serviceId: selectedItem.value }));
  }, [selectedItem?.value]);

  return (
    <View h="full">
      <HStack style={styles.header}>
        <HStack style={styles.service}>
          <Text fontSize="2xl" marginRight="5">
            Service
          </Text>
          <ThemedPicker
            options={userServices}
            placeholder="Choose a service"
            onSelectChange={(v: any | undefined) => {
              setSelectedItem(v);
            }}
          />
        </HStack>

        <View style={styles.create}>
          <Button onPress={handleClick}>Create Service</Button>
        </View>
      </HStack>

      <Tab.Navigator>
        <Tab.Screen name="Service" component={DeveloperServiceScreen} />
        <Tab.Screen name="API" component={DeveloperServiceAPIScreen} />
        <Tab.Screen name="Flows" component={DeveloperFlowScreen} />
      </Tab.Navigator>

      {status === 'loading' || (serviceStatus === 'loading' && <ThemedSpinner />)}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  create: {
    alignSelf: 'flex-start',
  },
  service: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
