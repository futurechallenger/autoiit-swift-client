import { useNavigation } from '@react-navigation/native';
import { Box, Button, Divider, HStack, Text, TextArea, View, VStack } from 'native-base';
import * as React from 'react';

import { ThemedTitle } from '../../components/ThemedTitle';
import { getCurrentUserInfo } from '../../redux/gql/getCurrentUserInfoSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { updateAutoFlow } from '../../redux/gql/updateAutoFlowSlice';

const { useEffect, useState } = React;

export const FlowReviewScreen = () => {
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.updateAutoFlow);
  const {
    userInfo,
    status: userStatus,
    error: userError,
  } = useAppSelector((state: RootState) => state.currentUserInfo);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [charNum, setCharNum] = useState<number>(0);
  const [flowTitle, setFlowTitle] = useState<string | null | undefined>();

  useEffect(() => {
    dispatch(getCurrentUserInfo());
    setFlowTitle(autoFlow?.title ?? '');
  }, []);

  useEffect(() => {
    if (!status) {
      return;
    }

    if (status === 'succeeded') {
      navigation.navigate('FlowDetail', { flowId });
    }
  }, [status]);

  const handlePress = () => {
    console.log('>>finish button is clicked');
    dispatch(updateAutoFlow({ autoFlow: { title: flowTitle } }));
    // TODO: navigate to flow-detail-screen
    // navigation.navigate('FlowDetail', { autoFlow });
  };

  const handleChange = (e) => {
    setFlowTitle(e.currentTarget.value);
  };

  const handleChangeText = (text) => {
    setFlowTitle(text);
  };

  return (
    <Box h="full" w="full" alignItems="center" alignContent="center">
      <ThemedTitle>Review and finish</ThemedTitle>
      <Divider />
      <VStack bgColor="blue.100" w="1/2">
        {/* Autoiit flow title */}
        <Text bgColor="red.100" w="full" fontSize={15}>
          Title
        </Text>
        <TextArea
          marginTop={2}
          autoCompleteType=""
          h={20}
          value={flowTitle ?? ''}
          onChange={handleChange} // for web
          onChangeText={handleChangeText}
        />
        <HStack w="full" justifyContent="space-between">
          <Text>{userInfo?.name && ` by ${userInfo.name}`}</Text>
          <Text>{flowTitle?.length ?? 0} / 140</Text>
        </HStack>

        {/* TODO: Review notifications when this flow runs */}
      </VStack>
      <Box minWidth={100} width={200} marginTop={50}>
        <Button onPress={handlePress}>Finish</Button>
      </Box>
    </Box>
  );
};
