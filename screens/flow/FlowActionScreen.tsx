import * as React from 'react';
import { View, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export const FlowActionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { item: action } = route?.params ?? {};

  const { actionInputFields, status, error } = useAppSelector(
    (state: RootState) => state.actionInputFields,
  );

  const {
    autoFlow,
    status: flowStatus,
    error: flowError,
  } = useAppSelector((state: RootState) => state.autoFlowsByService);

  return (
    <View>
      <Text>complete actions</Text>
    </View>
  );
};
