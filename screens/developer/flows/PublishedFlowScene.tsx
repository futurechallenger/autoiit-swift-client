import * as React from 'react';
import { View, Text, Divider, FlatList } from 'native-base';
import { ThemedTitle } from '../../../components/ThemedTitle';
import { useAppDispatch } from '../../../redux/hooks';

interface Props {
  params: any;
}

export const PublishedFlowScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { service, published } = params ?? {};

  return (
    <View>
      <ThemedTitle>Published Flows</ThemedTitle>
      <Divider />
      <FlatList
        data={published ?? []}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.id}</Text>
          </View>
        )}
      />
    </View>
  );
};
