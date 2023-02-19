import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Button,
  HStack,
  Select,
  CheckIcon,
  Spinner,
} from 'native-base';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DeveloperServiceScreen } from './DeveloperServiceScreen';
import { DeveloperServiceAPIScreen } from './DeveloperServiceAPIScreen';
import { DeveloperFlowScreen } from './DeveloperFlowScreen';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getServicesByUserId } from '../../redux/gql/servicesByUserIdSlice';
import { ThemedPicker } from '../../components/ThemedPicker';
import { getServiceById } from '../../redux/gql/serviceById';
import { ThemedSpinner } from '../../components/ThemedSpinner';

const { useState, useEffect } = React;

const Tab = createMaterialTopTabNavigator();

export const DeveloperScreen = () => {
  const [selectedItem, setSelectedItem] = useState<
    { value: number; label: string } | undefined
  >();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {
    services: userServices,
    status,
    error,
  } = useAppSelector((state: RootState) => state.userServices);
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

  // useEffect(() => {
  //   if (!userServices || userServices.length <= 0) {
  //     return;
  //   }
  //   // const items = userServices.sort((el1, el2) => el1.id - el2.id);
  //   dispatch(
  //     getServiceById({ serviceId: userServices[userServices.length - 1].id }),
  //   );
  // }, [userServices]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }
    dispatch(getServiceById({ serviceId: selectedItem.value }));
  }, [selectedItem]);

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
              // if (selectedItem) {
              //   dispatch(getServiceById({ serviceId: selectedItem.value }));
              // }
              setSelectedItem(v);
            }}
          />
        </HStack>

        <View style={styles.create}>
          <Button onPress={handleClick}>Create Service</Button>
        </View>
      </HStack>

      <Tab.Navigator>
        <Tab.Screen
          name="Service"
          component={DeveloperServiceScreen}
          initialParams={{ serviceDetail }}
        />
        <Tab.Screen name="API" component={DeveloperServiceAPIScreen} />
        <Tab.Screen
          name="Flows"
          component={DeveloperFlowScreen}
          initialParams={{ service: serviceDetail }}
        />
      </Tab.Navigator>

      {status === 'loading' ||
        (serviceStatus === 'loading' && <ThemedSpinner />)}
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
