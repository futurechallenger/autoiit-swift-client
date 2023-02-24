import * as React from 'react';
import { View, Text, Spinner } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Types from '../../redux/types.generated';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getServiceActions } from '../../redux/gql/getActionsSlice';
import { TriggerList } from '../../components/TriggerList';
import { getServiceAuth } from '../../redux/gql/getServiceAuthBySlice';

const { useState, useEffect } = React;

/**
 * TODO: refactor with `TriggersScreen` use custom hooks
 */

export const ActionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { item: service, phrase } = route?.params ?? {};

  const dispatch = useAppDispatch();
  const { actions, status, error } = useAppSelector(
    (state: RootState) => state.serviceActions,
  );
  const {
    serviceAuth,
    status: gettingAuthStatus,
    error: gettingAuthError,
  } = useAppSelector((state: RootState) => state.getServiceAuth);

  useEffect(() => {
    if (service?.id) {
      dispatch(getServiceActions({ serviceId: service?.id }));
      dispatch(getServiceAuth({ serviceId: service?.id }));
    }
  }, []);

  const handleItemClick = (item: Types.ServiceAction) => {
    // TODO: Deal with auth completed scenario
    if (!serviceAuth) {
      navigation.navigate('CompleteAction', { item, service, phrase });
    } else {
      navigation.navigate('Connection', { item, service, phrase });
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
          <TriggerList data={actions ?? []} onItemClick={handleItemClick} />
        )}
      </View>
    </View>
  );
};
