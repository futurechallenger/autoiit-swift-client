import { Picker } from '@react-native-picker/picker';
import { Box, Button, Divider, Text, View } from 'native-base';
import * as React from 'react';

import { FieldsMapping } from '../../components/FieldsMapping';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { addFieldMappingItems } from '../../redux/gql/addFieldMappingItemsSlice';
import { getActionOutputFieldList } from '../../redux/gql/getActionOutputFieldListSlice';
import { getTriggerExposeFields } from '../../redux/gql/getTriggerExposeFieldsSlice';
import { updateAutoFlow } from '../../redux/gql/updateAutoFlowSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import * as Types from '../../redux/types.generated';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

const { useRef, useEffect, useState } = React;

export const FlowActionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { item: action } = route?.params ?? {};

  const [actionInfo, setActionInfo] = useState<{
    id: string;
    items: Array<Types.ExposeField | string>;
  }>({});

  const {
    actionOutputFieldList: actionOutputFields,
    status,
    error,
  } = useAppSelector((state: RootState) => state.actionOutputFieldList);

  const {
    autoFlow: updatedFlow,
    status: updatedFlowStatus,
    error: updatedFlowError,
  } = useAppSelector((state: RootState) => state.updateAutoFlow);

  const { autoFlow, status: flowStatus, error: flowError } = useAppSelector((state: RootState) => state.autoFlowById);

  const {
    autoFlow: addedFlow,
    status: addedFlowStatus,
    error: addedFlowError,
  } = useAppSelector((state: RootState) => state.addAutoFlow);

  const {
    exposeFields,
    status: exposeFieldsStatus,
    error: exposeFieldsError,
  } = useAppSelector((state: RootState) => state.exposeFields);
  const {
    trigger,
    status: triggerStatus,
    error: triggerError,
  } = useAppSelector((state: RootState) => state.serviceTriggerById);

  const handleAddMapping = (items) => {
    dispatch(addFieldMappingItems({ mappingItems: items }));
  };

  const handleUpdateMappingItem = (item) => {
    console.log('Update field mapping item', item);
  };

  useEffect(() => {
    if (action?.id) {
      dispatch(getActionOutputFieldList({ serviceApiActionId: action?.id }));
    }

    if (addedFlow?.triggerId) {
      dispatch(getTriggerExposeFields({ triggerId: addedFlow?.triggerId }));
    }
  }, []);

  useEffect(() => {
    if (!updatedFlow) {
      return;
    }

    navigation.dispatch(StackActions.popToTop());
  }, [updatedFlow]);

  const handleCreate = () => {
    console.log('Handle create action');
    if (!addedFlow?.id) {
      console.error('ERR: autoflow Id is invalid');
      return;
    }
    dispatch(
      updateAutoFlow({
        autoFlow: {
          id: addedFlow?.id,
          actionId: action.id,
        },
      }),
    );
  };

  /**
   * Render input component according to `inputType`
   * @param inputType, 0: text input, 1: dropdown, 2: multiple checkbox selection
   * @returns
   */
  const renderInputComp = (inputType: Types.Maybe<number> | undefined, actionField: Types.ActionInputField) => {
    const inputCompType = inputType ?? 0;
    // const keyName = actionField?.keyName ?? '';

    switch (inputCompType) {
      case -1:
      case 0:
        return (
          <View justifyContent="flex-start" alignItems="flex-start">
            <FieldsMapping
              actionField={actionField}
              exposeFields={exposeFields}
              onSave={handleAddMapping}
              onUpdate={handleUpdateMappingItem}
            />
          </View>
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
    if (!action?.id || !actionOutputFields) {
      return null;
    }

    return actionOutputFields.map((field) => {
      return (
        <View key={field?.keyName} marginTop="5">
          <ThemedText>{field?.label}</ThemedText>
          {renderInputComp(field.fieldType, field)}
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
