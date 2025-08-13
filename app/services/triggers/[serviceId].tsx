import * as React from 'react';

import { View, Text, Spinner, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { TriggerList } from '@/components/TriggerList';
import { useNavigation } from '@react-navigation/native';
import * as Types from '@/redux/types.generated';
import { getServiceTriggers } from '@/redux/gql/getTriggersSlice';
import { getServiceAuth } from '@/redux/gql/getServiceAuthBySlice';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { useEffect } = React;

/**
 * TODO: refactor with `ActionsScreen` use custom hooks
 */

export default function TriggersScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const route = useRoute();
  const router = useRouter();

  const { item: service } = route?.params ?? {};

  const dispatch = useAppDispatch();
  const { triggers, error, status } = useAppSelector((state: RootState) => state.serviceTriggers);
  const {
    serviceAuth,
    status: gettingAuthStatus,
    error: gettingAuthError,
  } = useAppSelector((state: RootState) => state.getServiceAuth);

  useEffect(() => {
    if (service?.id) {
      dispatch(getServiceTriggers({ serviceId: service?.id }));
      dispatch(getServiceAuth({ serviceId: service?.id }));
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Choose a trigger',
    });
  }, [navigation]);

  const handleItemClick = (item: Types.ServiceTrigger) => {
    // TODO: Deal with auth completed scenario
    // if (!serviceAuth || serviceAuth.category === 1) {
    //   navigation.navigate('Connection', { item, service, phrase: 'Trigger' });
    // } else {
    //   navigation.navigate('CompleteTrigger', {
    //     item,
    //     service,
    //     phrase: 'Trigger',
    //   });
    // }
  };

  return (
    <View w="full" h="full" p={4} paddingBottom={insets.bottom}>
      {/* Top Section: Service Info and Icon */}
      <View h="1/3" justifyContent="center" alignItems="center">
        <View w="2/3" h="2/3" bg="blue.100" justifyContent="center" alignItems="center" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {service?.name ?? 'An unknown service'}
          </Text>
        </View>
        {/* Middle Section: Service Description */}
        <View h="1/3" p={4} justifyContent="center">
          <Text fontSize="md" color="gray.600">
            {service?.description ?? 'No description available.'}
          </Text>
        </View>
      </View>

      {/* Bottom Section: Trigger List */}
      <View className="flex-1" bg="green.50" borderRadius="md" p={4}>
        {status === 'loading' ? (
          <Spinner size="lg" />
        ) : (
          <TriggerList data={triggers ?? []} onItemClick={handleItemClick} />
        )}
      </View>
    </View>
  );
}
