import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Divider, Text, View } from 'native-base';
import * as React from 'react';

import { FieldsMapping } from '../../components/FieldsMapping';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import { addFieldMappingItems } from '../../redux/gql/addFieldMappingItemsSlice';
import { getActionInputFields } from '../../redux/gql/getActionInputFieldsSlice';
import { getFieldMappingItems } from '../../redux/gql/getFieldMappingItemsSlice';
import { getTriggerExposeFields } from '../../redux/gql/getTriggerExposeFieldsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import * as Types from '../../redux/types.generated';

const { useRef, useEffect, useState } = React;

export const FlowActionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // const { item: action } = route?.params ?? {};

  // TODO: for test only
  const action: Types.ServiceAction = {
    id: 1,
    name: 'github-issue-trello',
    serviceApiId: 4,
    description: 'github issues added to trello cards',
    endpointPath: '/1/cards',
    // endpointType: 1,
    // invokeType: 0,
  };

  const [actionInfo, setActionInfo] = useState<{
    id: string;
    items: Array<Types.ExposeField | string>;
  }>({});

  const { actionInputFields, status, error } = useAppSelector((state: RootState) => state.actionInputFields);

  const {
    autoFlow: updatedFlow,
    status: updatedFlowStatus,
    error: updatedFlowError,
  } = useAppSelector((state: RootState) => state.updateAutoFlow);

  const { autoFlow, status: flowStatus, error: flowError } = useAppSelector((state: RootState) => state.autoFlowById);

  // TODO: donot delete
  // const {
  //   autoFlow: addedFlow,
  //   status: addedFlowStatus,
  //   error: addedFlowError,
  // } = useAppSelector((state: RootState) => state.addAutoFlow);
  const addedFlow: Types.AutoFlow = {
    id: 5,
    triggerId: 1,
    actionId: 1,
    title: 'if ... then ...',
  };

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
      dispatch(getActionInputFields({ actionId: action?.id }));
    }

    if (addedFlow?.triggerId) {
      dispatch(getTriggerExposeFields({ triggerId: addedFlow?.triggerId }));
    }
  }, []);

  const handleCreate = () => {
    console.log('Handle create action');
  };

  // const handleItemClick = (
  //   actionField: Types.ActionInputField,
  //   item: Types.ExposeField,
  // ) => {
  //   console.log('>>>>>>Handle mapping, item >>', item);
  //   if (!actionField || !actionField?.id) {
  //     return;
  //   }
  //   const items: Types.ExposeField[] = (actionInfo[`${actionField.id}`] ??
  //     []) as Types.ExposeField[];
  //   items.push(item);
  //   setActionInfo({ ...actionInfo, [`${actionField.id}`]: [...items] });
  //   const presentationText = items
  //     .map((el) => {
  //       if (el?.id) {
  //         return el.label;
  //       }

  //       return el;
  //     })
  //     .join();
  //   // setTextSlice(presentationText);
  // };

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
    if (!action?.id || !actionInputFields) {
      return null;
    }

    return actionInputFields.map((field) => {
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
