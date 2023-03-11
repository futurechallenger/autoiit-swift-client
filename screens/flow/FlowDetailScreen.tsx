import { useNavigation } from '@react-navigation/native';
import { Box, Button, Divider, HStack, Text, View, VStack } from 'native-base';
import * as React from 'react';

import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { getCurrentUserInfo } from '../../redux/gql/getCurrentUserInfoSlice';
import { updateAutoFlow } from '../../redux/gql/updateAutoFlowSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const { useEffect } = React;

export const FlowDetailScreen = () => {
  const dispatch = useAppDispatch();
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.updateAutoFlow);
  const {
    userInfo,
    status: userStatus,
    error: userError,
  } = useAppSelector((state: RootState) => state.currentUserInfo);

  const handlePress = () => {
    console.log('>>Click connect / connected button');
  };

  const handlePublish = () => {
    dispatch(updateAutoFlow({ autoFlow: { id: autoFlow?.id, published: 1 } }));
  };

  const handleArchive = () => {
    dispatch(updateAutoFlow({ autoFlow: { id: autoFlow?.id, archived: 1 } }));
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
      </VStack>
      {/* TODO: Review notifications when this flow runs */}
      <Button onPress={handlePress}>Connect</Button>
      <VStack>
        <ThemedText>More details</ThemedText>
        {/* Connected date */}
        {/* Never run ->> runned or not */}
        <Divider />
        {/* TODO: Notify me when this runs - switch  */}
        <Divider />
        <HStack>
          <ThemedTitle>Check log of the flow</ThemedTitle>
          <Button>View activity</Button>
        </HStack>
        <HStack>
          <ThemedTitle>Publish this flow so others can use this flow</ThemedTitle>
          <Button onPress={handlePublish}>Publish</Button>
        </HStack>
        <Box>
          <Button onPress={handleArchive}>Archive</Button>
        </Box>
      </VStack>
      <ThemedText>{`ID:  ${autoFlow?.id}`}</ThemedText>
      {/* <Box>
        <ThemedTitle>More like this</ThemedTitle>
      </Box> */}
    </View>
  );
};
