import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Box, Container, FlatList, Text, View, ZStack } from 'native-base';
import { router } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedTitle } from '@/components/ThemedTitle';
import { getAutoFlowListByUser } from '@/redux/gql/getAutoFlowListByUserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import * as Types from '@/redux/types.generated';
import { useFlowListCategory } from '@/hooks/useFlowListCategory';

const { useEffect, useState } = React;

const Tab = createMaterialTopTabNavigator();

// TODO: delete this later
const TEST_USER_ID = 5;

export default function FlowListScreen() {
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     dispatch(getAutoFlowListByUser({ userId: TEST_USER_ID }));
  //   }
  // }, [isFocused]);

  const renderActivityIndicator = () => {
    // if (status === 'loading') {
    //   return (
    //     <ZStack>
    //       <ActivityIndicator size="large" />
    //     </ZStack>
    //   );
    // }
  };

  return (
    <View width="full" height="full" justifyContent="start" padding={4}>
      <Stack.Screen options={{ title: 'Flows' }} />
      <Container alignSelf="center">
        <ThemedTitle>My Flows</ThemedTitle>
      </Container>
      {/* <Tab.Navigator>
        <Tab.Screen name="All (0 / 0)" component={AllFlows} initialParams={{ cat: 'all' }} />
        <Tab.Screen name="Published" component={AllFlows} initialParams={{ cat: 'published' }} />
        <Tab.Screen name="Archive" component={AllFlows} initialParams={{ cat: 'archive' }} />
      </Tab.Navigator> */}

      {renderActivityIndicator()}
    </View>
  );
}

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
    route: {
      params: { cat },
    },
  } = params;

  const data = useFlowListCategory(cat, autoFlowList);

  return (
    <View style={styles.allFlowContainer}>
      <FlatList
        bgColor="yellow.100"
        marginTop={5}
        w="full"
        flex={1}
        data={data ?? []}
        renderItem={({ item }: { item: Types.AutoFlow }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('FlowDetail', { flowId: item.id });
                // router.push({pathname:'/flow/[id]', params: { id: item.id }});
                router.push({ pathname: `/flow/${item.id}` });
              }}
            >
              <View
                height={50}
                borderBottomWidth={1}
                justifyContent="center"
                borderColor="muted.800"
                _dark={{ borderColor: 'muted.100' }}
              >
                <Text>{item?.title ?? ''}</Text>{' '}
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  allFlowContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
