import * as React from 'react';
import { Box, View, Text, Divider } from 'native-base';
import { ThemedTitle } from '../../components/ThemedTitle';

interface Props {
  params: any;
}
export const FlowTriggerScreen: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { trigger } = params ?? {};

  return (
    <View>
      <ThemedTitle>Complete trigger fields</ThemedTitle>
      <Divider />
      <Box>
        {/* Branding logo */}
        <Text>{trigger?.name}</Text>
        <Text>{trigger?.description}</Text>
      </Box>
      <Box>{/* show trigger fields according to config */}</Box>
    </View>
  );
};
