import * as React from 'react';
import { View, Text, Divider, Box, Button, Input } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getActionInputFields } from '../../redux/gql/getActionInputFieldsSlice';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import * as Types from '../../redux/types.generated';
import { Picker } from '@react-native-picker/picker';

const { useEffect, useState } = React;

export const FlowActionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { item: action } = route?.params ?? {};

  const [actionInfo, setActionInfo] = useState({});
  const { actionInputFields, status, error } = useAppSelector(
    (state: RootState) => state.actionInputFields,
  );

  const {
    autoFlow: updatedFlow,
    status: updatedFlowStatus,
    error: updatedFlowError,
  } = useAppSelector((state: RootState) => state.updateAutoFlow);

  const {
    autoFlow,
    status: flowStatus,
    error: flowError,
  } = useAppSelector((state: RootState) => state.autoFlowById);

  useEffect(() => {
    if (action?.id) {
      dispatch(getActionInputFields({ actionId: action?.id }));
    }
  }, []);

  const handleCreate = () => {};

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
            onBlur={(ev) =>
              setActionInfo({ ...actionInfo, [keyName]: ev.target.value })
            }
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
    if (!action?.id || !actionInputFields) {
      return null;
    }

    return actionInputFields.map((field) => {
      return (
        <View key={field?.keyName}>
          <ThemedText>{field?.label}</ThemedText>
          {renderInputComp(field.fieldType, field.keyName ?? '')}
          <ThemedText>{field?.helperText}</ThemedText>
        </View>
      );
    });
  };

  return (
    <View>
      <ThemedTitle>Complete action fields</ThemedTitle>
      <Divider />
      <Box>
        {/* Branding logo */}
        <Text>{action?.name}</Text>
        <Text>{action?.description}</Text>
      </Box>
      <Box>
        {/* show trigger fields according to config */}
        {renderFields()}
      </Box>
      <Box>
        <Button alignSelf="center" onPress={handleCreate}>
          Create action
        </Button>
      </Box>
    </View>
  );
};
