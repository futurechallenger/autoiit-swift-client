import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import * as React from 'react';

const VerticalDivider = () => {
  return <View width="2" h="16" bg="red.500" />;
};

export const CreateFlowScreen = () => {
  const navigation = useNavigation();

  return (
    <View h="full" w="full" justifyContent="flex-start" alignItems="center">
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
        <Button
          onPress={() =>
            navigation.navigate('ChooseService', { phrase: 'Trigger' })
          }
        >
          Add
        </Button>
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
          onPress={() =>
            navigation.navigate('ChooseService', { phrase: 'Action' })
          }
        >
          Add
        </Button>
      </View>
    </View>
  );
};
