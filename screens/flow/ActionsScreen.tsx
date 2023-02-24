import * as React from 'react';
import { View, Text, Spinner } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Types from '../../redux/types.generated';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getServiceActions } from '../../redux/gql/getActionsSlice';
import { TriggerList } from '../../components/TriggerList';

const { useState, useEffect } = React;

/**
 * TODO: refactor with `TriggersScreen` use custom hooks
 */

export const ActionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { item: service } = route?.params ?? {};

  const dispatch = useAppDispatch();
  const { actions, status, error } = useAppSelector(
    (state: RootState) => state.serviceActions,
  );

  useEffect(() => {
    if (service?.id) {
      dispatch(getServiceActions({ serviceId: service?.id }));
    }
  }, []);

  const handleItemClick = (item: Types.ServiceTrigger) => {
    // if (!serviceAuth) {
    //   navigation.navigate('CompleteTrigger', { trigger: item, service });
    // } else {
    //   navigation.navigate('Connection', { trigger: item, service });
    // }
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
