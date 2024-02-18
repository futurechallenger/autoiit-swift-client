import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Divider, HStack, Text, TextArea, View, VStack } from 'native-base';
import * as React from 'react';

import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { updateAutoFlow, resetStatus } from '../../redux/gql/updateAutoFlowSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getAutoFlowById } from '../../redux/gql/getAutoFlowByIdSlice';

const { useEffect, useState } = React;

export const FlowDetailScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const { flowId } = route.params ?? {};

  const [title, setTitle] = useState<string | null | undefined>();
  const [editTitle, setEditTitle] = useState<Boolean>(false);

  // TODO: for test only
  // const {
  //   autoFlow: autoFlowInfo,
  //   status: flowInfoStatus,
  //   error: flowInfoError,
  // } = useAppSelector((state: RootState) => state.autoFlowById);
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.updateAutoFlow);
  const {
    userInfo,
    status: userStatus,
    error: userError,
  } = useAppSelector((state: RootState) => state.currentUserInfo);

  useEffect(() => {
    if (!flowId) return;
    dispatch(getAutoFlowById({ flowId }));
  }, []);

  useEffect(() => {
    if (autoFlow?.title /*|| autoFlowInfo?.title*/) {
      setTitle(autoFlow?.title /*|| autoFlowInfo?.title*/);
    }
  }, [autoFlow?.title /*, autoFlowInfo?.title*/]);

  useEffect(() => {
    if (editTitle && status === 'succeeded') {
      setEditTitle(false);
      resetStatus();
    }
  }, [editTitle, status]);

  const handleConnect = () => {
    console.log('>>Click connect / connected button');
  };

  const handlePublish = () => {
    const autoFlowId = autoFlow?.id; /*?? autoFlowInfo?.id*/
    dispatch(updateAutoFlow({ autoFlow: { id: autoFlowId, published: 1 } }));
  };

  const handleArchive = () => {
    const autoFlowId = autoFlow?.id; /*?? autoFlowInfo?.id*/
    dispatch(updateAutoFlow({ autoFlow: { id: autoFlowId, archived: 1 } }));
  };

  const handleSettings = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const handleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeText = (text: string) => {
    setTitle(text);
  };

  const handleEditTitleClick = () => {
    setEditTitle(!editTitle);
  };

  const handleEditTitleDone = () => {
    const autoFlowId = autoFlow?.id; /*?? autoFlowInfo?.id*/
    dispatch(updateAutoFlow({ autoFlow: { id: autoFlowId, title } }));
  };

  const renderTitle = () => {
    if (!editTitle) {
      return (
        <VStack>
          <Text>{title}</Text>
          <Button maxW={100} minW={60} onPress={handleEditTitleClick}>
            Edit title
          </Button>
        </VStack>
      );
    }

    return (
      <>
        <TextArea autoCompleteType="" value={title ?? ''} onChange={handleChange} onChangeText={handleChangeText} />
        <Button maxW={100} minW={60} onPress={handleEditTitleDone}>
          Done
        </Button>
      </>
    );
  };

  return (
    <View>
      <View>
        <Button onPress={handleSettings}>Settings</Button>
      </View>
      <ThemedTitle>Review and finish</ThemedTitle>
      <VStack>
        {/* Autoiit flow title */}
        {/* <Text>Auto flow Title</Text> */}
        {renderTitle()}
        <Text>by {userInfo?.name ?? ''}</Text>
        <Divider />
      </VStack>
      {/* TODO: Review notifications when this flow runs */}
      <Button onPress={handleConnect}>Connect</Button>
      <VStack>
        <ThemedText>More details</ThemedText>
        {/* Connected date */}
        {/* Never run ->> run or not */}
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
