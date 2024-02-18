import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FlatList,
  HStack,
  Text,
  TextArea,
  View,
  VStack,
  ZStack,
} from 'native-base';
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import * as Types from '../../redux/types.generated';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { AddActionMappingFieldDocument } from '../../redux/gql/addActionMappingFieldSlice';
import { getAutoFlowListByUser } from '../../redux/gql/getAutoFlowListByUserSlice';
import { ThemedTitle } from '../../components/ThemedTitle';

const { useEffect, useState } = React;

const Tab = createMaterialTopTabNavigator();

// TODO: delete this later
const TEST_USER_ID = 5;

export const FlowListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAutoFlowListByUser({ userId: TEST_USER_ID }));
  }, []);

  // const handleItemClick = (item: Types.AutoFlow) => {
  //   console.log(`Item clicked ${item.id}`);
  // };

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
    <View width="full" height="full" justifyContent="start" padding={4}>
      <Container alignSelf="center">
        <ThemedTitle>My Flows</ThemedTitle>
      </Container>
      {/* <HStack width="full" alignContent="space-between" bgColor="yellow.100">
        <Box flexDirection="row" bgColor="green.100" width="1/2" justifyContent="space-around">
          <VStack>
            <TouchableOpacity>All(0/0)</TouchableOpacity>
            <View bgColor="blue.100" h={2} />
          </VStack>
          <VStack>
            <TouchableOpacity>Published</TouchableOpacity>
            <View bgColor="blue.100" h={2} />
          </VStack>
          <VStack>
            <TouchableOpacity>Archive</TouchableOpacity>
            <View bgColor="blue.100" h={2} />
          </VStack>
        </Box>
      </HStack> */}
      <Tab.Navigator>
        <Tab.Screen name="All (0 / 0)" component={AllFlows} />
        <Tab.Screen name="Published" component={TempScreen} />
        <Tab.Screen name="Archive" component={TempScreen} />
      </Tab.Navigator>

      {renderActivityIndicator()}
    </View>
  );
};

const renderEmpty = () => (
  <Container width="full">
    <Text>Empty</Text>
  </Container>
);

const TempScreen = () => (
  <Container width="full">
    <Text>Empty</Text>
  </Container>
);

const AllFlows = (params: any) => {
  const { autoFlowList, status, error } = useAppSelector((state: RootState) => state.autoFlowListByUser);
  const {
    navigation,
    // route: {
    //   params: { autoFlowList },
    // },
  } = params;

  return (
    <Container width="full" flex={1} alignSelf="center">
      <FlatList
        bgColor="yellow.100"
        marginTop={5}
        w="full"
        flex={1}
        data={autoFlowList ?? []}
        renderItem={({ item }: { item: Types.AutoFlow }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FlowDetail', { flowId: item.id });
              }}
            >
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
        }}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
};
