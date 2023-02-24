import { Box, Button, Divider, Input, Text, View } from 'native-base';
import * as React from 'react';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { getTriggerFields } from '../../redux/gql/getTriggerFieldsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import * as Types from '../../redux/types.generated';
import { addAutoFlow } from '../../redux/gql/addAutoFlowSlice';

const { useEffect, useState } = React;

interface Props {
  params: any;
}

/**
 * TODO: Complete dropdown / multip checkbox selection handling
 */

export const FlowTriggerScreen: React.FunctionComponent<Props> = ({
  params,
}) => {
  const route = useRoute();
  const { trigger } = route?.params ?? {};

  const [triggerInfo, setTriggerInfo] = useState({});

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector(
    (state: RootState) => state.triggerFields,
  );
  const {
    autoFlow,
    status: flowStatus,
    error: flowError,
  } = useAppSelector((state: RootState) => state.addAutoFlow);
  const {
    autoFlow: updatedAutoFlow,
    status: updatedFlowStatus,
    error: updatedFlowError,
  } = useAppSelector((state: RootState) => state.updateAutoFlow);

  useEffect(() => {
    if (!trigger?.id) {
      return;
    }

    dispatch(getTriggerFields({ triggerId: trigger?.id }));
  }, [trigger]);

  const handleCreate = () => {
    dispatch(
      addAutoFlow({
        flow: {
          triggerId: trigger?.id,
          triggerInfo: JSON.stringify(triggerInfo ?? {}),
        },
      }),
    );
  };

  /**
   * Render input component according to `inputType`
   * @param inputType, 0: text input, 1: dropdown, 2: multiple checkbox selection
   * @returns
   */
  const renderInputComp = (
    inputType: Types.Maybe<number> | undefined,
    keyName: string,
  ) => {
    const inputCompType = inputType ?? 0;
    switch (inputCompType) {
      case -1:
      case 0:
        return (
          <Input
            onChangeText={(v) => setTriggerInfo({ ...triggerInfo, keyName: v })}
          />
        );
      case 1:
        return <Picker />;
      case 2:
        return <Text>TODO: multiple checkbox</Text>;
      default:
        return null;
    }
  };

  const renderFields = () => {
    if (!trigger?.id || !triggerFields) {
      return null;
    }

    return triggerFields.map((field) => {
      return (
        <>
          <ThemedText>{field.label}</ThemedText>
          {renderInputComp(field.inputType, field.keyName ?? '')}
          <ThemedText>{field.helperText}</ThemedText>
        </>
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
        <Button alignSelf="center" onPress={handleCreate}>
          Create trigger
        </Button>
      </Box>
    </View>
  );
};
