import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Divider, FlatList, HStack, Spinner, View } from 'native-base';
import * as React from 'react';
import { ListRenderItem, ListRenderItemInfo, Pressable } from 'react-native';
import { EditableCell } from '../../../components/EditableCell';
import { ThemedTitle } from '../../../components/ThemedTitle';
import { getServiceTriggers } from '../../../redux/gql/getTriggersSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import * as Types from '../../../redux/types.generated';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const TriggerGeneralScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { serviceApi, setScene } = params ?? {};
  const { triggers, error, status } = useAppSelector(
    (state: RootState) => state.serviceTriggers,
  );
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!serviceApi?.serviceId || !isFocused) {
      return;
    }

    dispatch(getServiceTriggers({ serviceId: serviceApi?.serviceId }));
  }, [serviceApi?.serviceId, isFocused]);

  const renderItem: ListRenderItem<Types.ServiceTrigger> = ({
    item,
  }: ListRenderItemInfo<Types.ServiceTrigger>) => {
    return (
      <Pressable>
        <EditableCell
          title={item.name ?? ''}
          onEditClick={() => handleClickItem(item)}
        />
      </Pressable>
    );
  };

  const handleClick = () => {
    setScene({ name: 'CreateTrigger' });
  };

  const handleClickItem = (item: Types.ServiceTrigger) => {
    setScene({ name: 'TriggerDetail', params: item });
  };

  return (
    <View style={{ height: '800' }}>
      <HStack
        w="full"
        marginTop={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <ThemedTitle>Triggers</ThemedTitle>
        <View>
          <Button onPress={handleClick}>Add Trigger</Button>
        </View>
      </HStack>
      <Divider marginTop={5} />
      <View marginY={5}>
        <FlatList data={triggers ?? []} renderItem={renderItem} />
      </View>
      <Divider marginTop={5} />
      {status === 'loading' && <Spinner size="lg" />}
    </View>
  );
};
