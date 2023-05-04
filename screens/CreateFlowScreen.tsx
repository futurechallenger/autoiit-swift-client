import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import * as React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useIsFocused } from '@react-navigation/native';

const VerticalDivider = () => {
  return <View width="2" h="16" bg="red.500" />;
};

export const CreateFlowScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { autoFlow, status, error } = useAppSelector((state: RootState) => state.addAutoFlow);

  const handleContinue = () => {
    // TODO: navigate to `Review and finish` screen
    navigation.navigate('ReviewFinish');
  };

  return (
    <View h="full" w="full" justifyContent="flex-start" alignItems="center">
      <Text>{isFocused ? 'focused' : 'not focused'}</Text>
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
        <Text fontSize="60" marginRight="10" marginY="5">
          When
        </Text>
        <Button onPress={() => navigation.navigate('ChooseService', { phrase: 'Trigger' })}>Add</Button>
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
        <Text fontSize="60" marginRight="10" marginY="5">
          Then
        </Text>
        <Button
          disabled={!autoFlow}
          bgColor={!autoFlow ? 'muted.500' : null}
          onPress={() => navigation.navigate('ChooseService', { phrase: 'Action' })}
        >
          Add
        </Button>
      </View>
      <View marginTop={36}>
        <Button onPress={handleContinue}>Continue</Button>
      </View>
    </View>
  );
};
