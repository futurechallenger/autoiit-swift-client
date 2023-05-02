import { Box, Button, Center, Divider, Input, Text, View } from 'native-base';
import * as React from 'react';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { getTriggerFields } from '../../redux/gql/getTriggerFieldsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

import { Picker } from '@react-native-picker/picker';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import * as Types from '../../redux/types.generated';
import { addAutoFlow } from '../../redux/gql/addAutoFlowSlice';

const { useEffect, useState } = React;

interface Props {
  params: any;
}

/**
 * TODO: Complete dropdown / multip checkbox selection handling
 */

export const FlowTriggerScreen: React.FunctionComponent<Props> = ({ params }) => {
  const route = useRoute();
  const { item: trigger } = route?.params ?? {};
  const navigation = useNavigation();

  const [triggerInfo, setTriggerInfo] = useState({});

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector((state: RootState) => state.triggerFields);
  const { autoFlow, status: flowStatus, error: flowError } = useAppSelector((state: RootState) => state.addAutoFlow);

  useEffect(() => {
    if (!trigger?.id) {
      return;
    }

    dispatch(getTriggerFields({ triggerId: trigger?.id }));
  }, [trigger]);

  useEffect(() => {
    if (!autoFlow) {
      return;
    }

    navigation.dispatch(StackActions.popToTop());
  }, [autoFlow]);

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
  const renderInputComp = (inputType: Types.Maybe<number> | undefined, keyName: string) => {
    const inputCompType = inputType ?? 0;

    switch (inputCompType) {
      case -1:
      case 0:
        return <Input onBlur={(ev) => setTriggerInfo({ ...triggerInfo, [keyName]: ev.target.value })} />;
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
        <View key={field?.keyName}>
          <ThemedText>{field.label}</ThemedText>
          {renderInputComp(field.inputType, field.keyName ?? '')}
          <ThemedText>{field.helperText}</ThemedText>
        </View>
      );
    });
  };

  return (
    <View>
      <Center>
        {/* <ThemedTitle>Complete trigger fields</ThemedTitle>
        <Divider /> */}
        <Box>
          {/* Branding logo */}
          <Text fontSize={48} fontWeight={700}>
            {trigger?.name}
          </Text>
          <Text>{trigger?.description}</Text>
        </Box>
        <Box marginTop={36}>
          {/* show trigger fields according to config */}
          {renderFields()}
        </Box>
        <Box marginTop={36}>
          <Button alignSelf="center" onPress={handleCreate}>
            Create trigger
          </Button>
        </Box>
      </Center>
    </View>
  );
};
