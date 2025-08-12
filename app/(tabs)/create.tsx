import { Text, View } from 'native-base';
import { router, useLocalSearchParams } from 'expo-router';
import { Modal, ScrollView } from 'react-native';
import { Button } from 'react-native';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { removeAutoFlow } from '@/redux/gql/removeAutoFlowSlice';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { RoundedButton } from '@/components/RoundedButton';

const VerticalDivider = () => {
  return <View width="2" h="16" bg="red.500" />;
};

export default function CreateFlowScreen() {
  const dispatch = useAppDispatch();
  const prevParam = useLocalSearchParams();

  console.log('>>>Router, prev param', prevParam);

  const [modalVisible, setModalVisible] = React.useState(false);

  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.addAutoFlow);

  const handleContinue = () => {
    // TODO: navigate to `Review and finish` screen
  };

  const handleCancel = () => {
    if (autoFlow?.id) {
      dispatch(removeAutoFlow({ flowId: autoFlow?.id }));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Create',
          headerRight: () => (
            <Pressable
              style={{ marginRight: 10 }}
              onPress={() => {
                console.log('help icon pressed');
              }}
            >
              <FontAwesome name="question-circle-o" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      {/* <Text>{isFocused ? 'focused' : 'not focused'}</Text> */}
      <View
        bg="yellow.300"
        minW="50%"
        width="300"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius="10"
        marginTop="10"
      >
        <Text fontSize="40" marginRight="10" marginY="5">
          When
        </Text>
        <RoundedButton
          onPress={() => {
            router.push('/choose-service');
          }}
        >
          Add
        </RoundedButton>
      </View>
      <VerticalDivider />
      <View
        bg="yellow.300"
        minW="50%"
        width="300"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius="10"
      >
        <Text fontSize="40" marginRight="10" marginY="5">
          Then
        </Text>
      </View>
      <View className="flex-1 flex-row mt-20 justify-around items-start w-full p-5 bg-amber-200">
        <Button onPress={handleCancel} title="Cancel" />
        <Button onPress={handleContinue} title="Continue" />
      </View>
    </ScrollView>
  );
}
