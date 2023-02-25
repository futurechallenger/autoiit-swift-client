import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  Button,
  Divider,
  FlatList,
  Input,
  Popover,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import { Pressable } from 'react-native';
import { ThemedText, ThemedTitle } from '../../components/ThemedTitle';
import {
  ActionInputFieldsDocument,
  getActionInputFields,
} from '../../redux/gql/getActionInputFieldsSlice';
import { getTriggerExposeFields } from '../../redux/gql/getTriggerExposeFieldsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import * as Types from '../../redux/types.generated';

const { useRef, useEffect, useState } = React;

export const FlowActionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { item: action } = route?.params ?? {};

  const popoverRef = useRef(null);
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

  const handleItemClick = (
    actionField: Types.ActionInputField,
    item: Types.ExposeField,
  ) => {
    console.log('>>>>>>Handle mapping, item >>', item);
    if (!actionField || !actionField?.id) {
      return;
    }
    const items: Types.ExposeField[] = (actionInfo[`${actionField.id}`] ??
      []) as Types.ExposeField[];
    items.push(item);
    setActionInfo({ ...actionInfo, [`${actionField.id}`]: [...items] });
  };

  /**
   * Render input component according to `inputType`
   * @param inputType, 0: text input, 1: dropdown, 2: multiple checkbox selection
   * @returns
   */
  const renderInputComp = (
    inputType: Types.Maybe<number> | undefined,
    actionField: Types.ActionInputField,
  ) => {
    const inputCompType = inputType ?? 0;
    const keyName = actionField?.keyName ?? '';
    const items = actionInfo[`${actionField.id}`] ?? [];
    const fieldValue = items.map((el) => `{{${el.label}}}`).join();

    switch (inputCompType) {
      case -1:
      case 0:
        return (
          <View justifyContent="flex-start" alignItems="flex-start">
            <Input
              value={fieldValue ?? ''}
              alignSelf="stretch"
              onBlur={(ev) =>
                setActionInfo({ ...actionInfo, [keyName]: ev.target.value })
              }
            />
            <Popover
              initialFocusRef={popoverRef}
              trigger={(props) => (
                <Button {...props} alignSelf="flex-end">
                  Add mapping
                </Button>
              )}
            >
              <Popover.Content>
                <Popover.CloseButton />
                <Popover.Header>{trigger?.name}</Popover.Header>
                <Popover.Body>
                  <FlatList
                    data={exposeFields ?? []}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => handleItemClick(actionField, item)}
                      >
                        <View>
                          <Text>{item?.label}</Text>
                        </View>
                      </Pressable>
                    )}
                  />
                </Popover.Body>
              </Popover.Content>
            </Popover>
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
        <View key={field?.keyName}>
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
