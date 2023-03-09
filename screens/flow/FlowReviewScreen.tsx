import * as React from 'react';
import { View, Text, Button, VStack, Divider } from 'native-base';
import { ThemedTitle } from '../../components/ThemedTitle';

export const FlowReviewScreen = () => {
  return (
    <View>
      <ThemedTitle>Review and finish</ThemedTitle>
      <VStack>
        {/* Autoiit flow title */}
        <Text>Auto flow Title</Text>
        <Text>{/* Autoiit flow title */}</Text>
        <Text>by {/* username */}</Text>
        <Divider />
        {/* TODO: Review notifications when this flow runs */}
        <Button>Finish</Button>
      </VStack>
    </View>
  );
};
