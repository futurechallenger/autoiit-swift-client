import * as React from 'react';
import { View, Text, Divider, FlatList } from 'native-base';
import { ThemedTitle } from '../../../components/ThemedTitle';

interface Props {
  params: any;
}

export const ArchivedFlowScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { archived } = params ?? {};

  return (
    <View>
      <ThemedTitle>Archived Flows</ThemedTitle>
      <Divider />
      <FlatList
        data={archived ?? []}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.id ?? 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};
