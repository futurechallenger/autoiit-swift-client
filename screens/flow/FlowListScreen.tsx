import { useNavigation } from '@react-navigation/native';
import { Box, Button, Divider, FlatList, HStack, Text, TextArea, View, VStack, ZStack } from 'native-base';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import * as Types from '../../redux/types.generated';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { AddActionMappingFieldDocument } from '../../redux/gql/addActionMappingFieldSlice';
import { getAutoFlowListByUser } from '../../redux/gql/getAutoFlowListByUserSlice';
const { useEffect, useState } = React;

// TODO: delete this later
const TEST_USER_ID = 5;

export const FlowListScreen = () => {
  const dispatch = useAppDispatch();
  const { autoFlowList, status, error } = useAppSelector((state: RootState) => state.autoFlowListByUser);

  useEffect(() => {
    dispatch(getAutoFlowListByUser({ userId: 5 }));
  }, []);

  const handleItemClick = (item: Types.AutoFlow) => {
    console.log(`Item clicked ${item.id}`);
  };

  const renderItem = ({ item }: { item: Types.AutoFlow }) => {
    return (
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Box
          height={50}
          borderBottomWidth={1}
          justifyContent="center"
          borderColor="muted.800"
          _dark={{ borderColor: 'muted.100' }}
        >
          <Text>{item?.title ?? ''}</Text>{' '}
        </Box>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => <Text>Empty</Text>;

  const renderActivityIndicator = () => {
    if (status === 'loading') {
      return (
        <ZStack>
          <ActivityIndicator size="large" />
        </ZStack>
      );
    }
  };

  return (
    <View width="full" height="full">
      <Text>Flow List</Text>
      <FlatList marginTop={5} data={autoFlowList ?? []} renderItem={renderItem} ListEmptyComponent={renderEmpty} />
      {renderActivityIndicator()}
    </View>
  );
};
