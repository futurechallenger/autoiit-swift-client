import * as React from 'react';

import { View, Text, Spinner, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import { TriggerList } from '../components/TriggerList';
import { useNavigation } from '@react-navigation/native';
import * as Types from '../redux/types.generated';
import { getServiceTriggers } from '../redux/gql/getTriggersSlice';
import { getServiceAuth } from '../redux/gql/getServiceAuthBySlice';

const { useEffect } = React;

/**
 * TODO: refactor with `ActionsScreen` use custom hooks
 */

export const TriggersScreen = () => {
  const route = useRoute();
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

  const navigation = useNavigation();

  const handleItemClick = (item: Types.ServiceTrigger) => {
    // TODO: Deal with auth completed scenario
    if (!serviceAuth || serviceAuth.category === 1) {
      navigation.navigate('Connection', { item, service, phrase: 'Trigger' });
    } else {
      navigation.navigate('CompleteTrigger', {
        item,
        service,
        phrase: 'Trigger',
      });
    }
  };

  return (
    <View w="full" h="full">
      <View>
        <Text>Service {service.name}</Text>
      </View>
      <View w="full" h="full" bg="green.50">
        {status === 'loading' ? (
          <Spinner size="lg" />
        ) : (
          <TriggerList data={triggers ?? []} onItemClick={handleItemClick} />
        )}
      </View>
    </View>
  );
};
