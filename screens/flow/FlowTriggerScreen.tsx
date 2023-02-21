import * as React from 'react';
import { Button, Box, View, Text, Divider } from 'native-base';
import { ThemedTitle } from '../../components/ThemedTitle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getTriggerFields } from '../../redux/gql/getTriggerFieldsSlice';
import { TriggerFieldInput } from '../developer/apiScenes/TriggerFieldInput';

import * as Types from '../../redux/types.generated';

const { useEffect } = React;

interface Props {
  params: any;
}

export const FlowTriggerScreen: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { trigger } = params ?? {};

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector(
    (state: RootState) => {
      state.triggerFields;
    },
  );

  useEffect(() => {
    if (!trigger?.id) {
      return;
    }

    dispatch(getTriggerFields({ triggerId: trigger?.id }));
  }, [trigger]);

  const renderFields = () => {
    if (!trigger?.id || !triggerFields) {
      return null;
    }

    return triggerFields.map((field) => {
      return (
        <TriggerFieldInput
          onCancel={() => console.log('Cancel is clicked')}
          onSave={() => console.log('Save is clicked')}
        />
      );
    });
  };

  return (
    <View>
      <ThemedTitle>Complete trigger fields</ThemedTitle>
      <Divider />
      <Box>
        {/* Branding logo */}
        <Text>{trigger?.name}</Text>
        <Text>{trigger?.description}</Text>
      </Box>
      <Box>
        {/* show trigger fields according to config */}
        {renderFields()}
      </Box>
      <Box>
        <Button>Create trigger</Button>
      </Box>
    </View>
  );
};
