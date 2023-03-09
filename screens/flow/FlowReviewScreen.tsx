import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Text, View, VStack } from 'native-base';
import * as React from 'react';

import { ThemedTitle } from '../../components/ThemedTitle';
import { getCurrentUserInfo } from '../../redux/gql/getCurrentUserInfoSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const { useEffect } = React;

export const FlowReviewScreen = () => {
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.updateAutoFlow);
  const {
    userInfo,
    status: userStatus,
    error: userError,
  } = useAppSelector((state: RootState) => state.currentUserInfo);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, []);

  const handlePress = () => {
    console.log('>>finish button is clicked');
    // TODO: navigate to flow-detail-screen
    // navigation.navigate();
  };

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
        <Text>by {userInfo?.name}</Text>
        <Divider />
        {/* TODO: Review notifications when this flow runs */}
        <Button onPress={handlePress}>Finish</Button>
      </VStack>
    </View>
  );
};
