import * as React from 'react';
import { View, Text, Button, VStack, Divider } from 'native-base';
import { ThemedTitle } from '../../components/ThemedTitle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getUserInfo } from '../../redux/gql/userInfoService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { useEffect } = React;

export const FlowReviewScreen = () => {
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.updateAutoFlow);
  const {} = useAppSelector((state: RootState) => state.userInfo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // const email = AsyncStorage();
    dispatch(getUserInfo());
  }, []);

  return (
    <View>
      <ThemedTitle>Review and finish</ThemedTitle>
      <VStack>
        {/* Autoiit flow title */}
        <Text>Auto flow Title</Text>
        <Text>
          {/* Autoiit flow title */}
          {autoFlow?.title}
        </Text>
        <Text>by {/* username */}</Text>
        <Divider />
        {/* TODO: Review notifications when this flow runs */}
        <Button>Finish</Button>
      </VStack>
    </View>
  );
};
