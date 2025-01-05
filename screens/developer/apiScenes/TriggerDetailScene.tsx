import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { EditableCell } from '../../../components/EditableCell';
import { TextInputDesc } from '../../../components/TextInputDesc';
import { InputTitle, ThemedTitle } from '../../../components/ThemedTitle';
import { addTriggerExposeField, resetStatus } from '../../../redux/gql/addTriggerExposeFieldSlice';
import { addTriggerField } from '../../../redux/gql/addTriggerFieldSlice';
import { getTriggerExposeFieldList } from '../../../redux/gql/getTriggerExposeFieldListSlice';
import { getTriggerFields } from '../../../redux/gql/getTriggerFieldsSlice';
import {
  removeTriggerExposeField,
  resetRemovedExposeFieldStatus,
} from '../../../redux/gql/removeTriggerExpopseFieldSlice';
import {
  deleteTriggerField,
  resetStatus as resetRemoveTriggerFieldStatus,
} from '../../../redux/gql/removeTriggerFieldSlice';
import { deleteTrigger } from '../../../redux/gql/removeTriggerSlice';
import {
  updateTriggerExposeField,
  resetUpdateExposeFieldStatus,
} from '../../../redux/gql/updateTriggerExposeFieldSlice';
import {
  updateTriggerField,
  resetStatus as resetUpdateTriggerFieldStatus,
} from '../../../redux/gql/updateTriggerFieldSlice';
import { updateServiceTrigger } from '../../../redux/gql/updateTriggerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import * as Types from '../../../redux/types.generated';
import { TriggerFieldInput } from './TriggerFieldInput';
import { current } from '@reduxjs/toolkit';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const TriggerDetailScene: React.FunctionComponent<Props> = ({ params }) => {
  const { serviceApi, sceneParams, setScene } = params ?? {};
  const trigger = sceneParams;

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector((state: RootState) => state.triggerFields);
  const {
    triggerField: addedField,
    status: addedStatus,
    error: addedError,
  } = useAppSelector((state: RootState) => state.addTriggerField);
  const {
    triggerField: updatedField,
    status: updatedStatus,
    error: updatedError,
  } = useAppSelector((state: RootState) => state.updateTriggerField);
  const {
    deleted,
    status: removedStatus,
    error: removedError,
  } = useAppSelector((state: RootState) => state.removeTriggerField);

  const {
    exposeFields,
    status: exposeFieldsStatus,
    error: exposeFieldsError,
  } = useAppSelector((state: RootState) => state.exposeFieldList);
  const {
    exposeField: addedExposeField,
    status: addedExposeFieldStatus,
    error: addExposeError,
  } = useAppSelector((state: RootState) => state.addExposeField);
  const {
    exposeField: updatedExposeField,
    status: updatedExposeFieldStatus,
    error: updatedExposeFieldError,
  } = useAppSelector((state: RootState) => state.updateExposeField);
  const {
    exposeField: removedExposeField,
    status: removedExposeFieldStatus,
    error: removedExposeFieldError,
  } = useAppSelector((state: RootState) => state.removeExposeField);

  const [name, setName] = useState();
  const [currentField, setCurrentField] = useState<Types.TriggerField | undefined>();
  const [currentExposeField, setCurrentExposeField] = useState<Types.ExposeField | undefined>();
  const [description, setDescription] = useState();
  const [endpointType, setEndpointType] = useState();
  const [endpointPath, setEndpointPath] = useState();
  const [showCreateField, setShowCreateField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [showCreateExposeField, setShowCreateExposeField] = useState(false);
  const [showEditExposeField, setShowEditExposeField] = useState(false);

  useEffect(() => {
    if (trigger?.id) {
      setName(trigger?.name);
      setDescription(trigger?.description);
      setEndpointPath(trigger?.endpointPath);
      setEndpointType(trigger?.endpointType);
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
      dispatch(getTriggerExposeFieldList({ triggerId: trigger?.id }));
    }
  }, [trigger]);

  useEffect(() => {
    if ((addedStatus === 'succeeded' || updatedStatus === 'succeeded') && trigger?.id) {
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [addedStatus, updatedStatus, trigger?.id]);

  // TODO: refactor this logic to customized hooks
  useEffect(() => {
    if ((addedExposeFieldStatus === 'succeeded' || updatedExposeFieldStatus === 'succeeded') && trigger?.id) {
      dispatch(resetStatus());
      dispatch(resetUpdateExposeFieldStatus());
      dispatch(getTriggerExposeFieldList({ triggerId: trigger?.id }));
    }
  }, [addedExposeFieldStatus, updatedExposeFieldStatus, trigger?.id]);

  useEffect(() => {
    if (addedStatus === 'succeeded' || updatedStatus === 'succeeded' || removedStatus === 'succeeded') {
      dispatch(resetStatus());
      dispatch(resetUpdateTriggerFieldStatus());
      dispatch(resetRemoveTriggerFieldStatus());
      setShowCreateField(false);
      setShowEditField(false);
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [addedStatus, updatedStatus, removedStatus]);

  useEffect(() => {
    if (
      addedExposeFieldStatus === 'succeeded' ||
      updatedExposeFieldStatus === 'succeeded' ||
      removedExposeFieldStatus === 'succeeded'
    ) {
      dispatch(resetStatus());
      dispatch(resetUpdateExposeFieldStatus());
      dispatch(resetRemovedExposeFieldStatus());
      setShowCreateExposeField(false);
      setShowEditExposeField(false);
      dispatch(getTriggerExposeFieldList({ triggerId: trigger?.id }));
    }
  }, [addedExposeFieldStatus, updatedExposeFieldStatus, removedExposeFieldStatus]);

  const handleInput = (nextValue) => {
    setEndpointPath(nextValue);
  };

  const handleDeleteTrigger = () => {
    dispatch(deleteTrigger({ triggerId: trigger?.id }));
  };

  const handleCreateTriggerField = (field: Types.TriggerField) => {
    dispatch(addTriggerField({ field }));
  };

  const handleEditTriggerField = (field: Types.TriggerField) => {
    dispatch(updateTriggerField({ field }));
  };

  const handleDeleteTriggerField = (fieldId: number) => {
    dispatch(deleteTriggerField({ fieldId }));
  };

  const handleCreateTriggerExposeField = (field: Types.ExposeFieldInput) => {
    dispatch(
      addTriggerExposeField({
        triggerExposeField: {
          helperText: field.helperText,
          keyName: field.keyName,
          label: field.label,
          fieldType: field?.inputType,
          // parserPath:
          serviceTriggerId: field.serviceTriggerId,
        },
      }),
    );
  };

  const handleEditTriggerExposeField = (field: Types.ExposeFieldInput) => {
    dispatch(
      updateTriggerExposeField({
        triggerExposeField: {
          id: field.id,
          helperText: field.helperText,
          keyName: field.keyName,
          label: field.label,
          example: field?.example,
          fieldType: field?.inputType,
          // parserPath:
          serviceTriggerId: field.serviceTriggerId,
        },
      }),
    );
  };

  const handleDeleteTriggerExposeField = (fieldId: number) => {
    dispatch(removeTriggerExposeField({ fieldId }));
  };
  const handleUpdateTrigger = () => {
    const targetTrigger = {
      id: trigger?.id,
      serviceApiId: serviceApi?.id,
      description,
      endpointPath,
      endpointType,
      name,
    };
    dispatch(updateServiceTrigger({ trigger: targetTrigger }));
  };

  const renderCreateEditTriggerField = () => {
    if (showCreateField) {
      return (
        <TriggerFieldInput
          key="create-field"
          triggerInfo={trigger}
          onSave={handleCreateTriggerField}
          onCancel={() => setShowCreateField(false)}
        />
      );
    }

    if (showEditField) {
      return (
        <TriggerFieldInput
          key="edit-field"
          triggerInfo={trigger}
          fieldInfo={currentField}
          onSave={handleEditTriggerField}
          onDelete={handleDeleteTriggerField}
          onCancel={() => setShowEditField(false)}
        />
      );
    }
  };

  const renderCreateEditTriggerExposeField = () => {
    if (showCreateExposeField) {
      return (
        <TriggerFieldInput
          key="create-field"
          triggerInfo={trigger}
          onSave={handleCreateTriggerExposeField}
          onCancel={() => setShowCreateExposeField(false)}
        />
      );
    }

    if (showEditExposeField) {
      return (
        <TriggerFieldInput
          key="edit-field"
          triggerInfo={trigger}
          fieldInfo={{ ...currentExposeField, inputType: currentExposeField?.fieldType }}
          onSave={handleEditTriggerExposeField}
          onDelete={handleDeleteTriggerExposeField}
          onCancel={() => setShowEditExposeField(false)}
        />
      );
    }
  };

  return (
    <View>
      <ThemedTitle>{trigger?.name}</ThemedTitle>
      <Divider />
      <TextInputDesc
        marginTop={10}
        text="Name"
        value={name}
        description="Use sentence case capitalization — no period"
        onTextChanged={(nextValue) => setName(nextValue)}
      />
      <TextInputDesc
        marginTop={10}
        text="Description"
        value={description}
        description="Must be a complete sentence starting with “This trigger fires” and ending with a period"
        onTextChanged={(nextValue) => setDescription(nextValue)}
      />
      <VStack>
        <InputTitle>Endpoint</InputTitle>
        <InputGroup>
          <InputLeftAddon children={'.../autoiit/v1/triggers/'} />
          <Input value={endpointPath} onChangeText={handleInput} />
        </InputGroup>
        <Text>API endpoint for this trigger. Must be in snake_case and begin with a letter.</Text>
      </VStack>
      <Divider marginTop={5} />
      <HStack justifyContent="space-between" alignItems="center" w="100%" h={60} marginY={5}>
        <Pressable onPress={handleDeleteTrigger}>
          <View style={styles.deleteButton}>
            <Ionicons name="trash" size={28} color="muted.50" />
            <Text color="muted.500">Delete trigger</Text>
          </View>
        </Pressable>
        <Button onPress={handleUpdateTrigger}>Save</Button>
      </HStack>
      <Box marginY={5}>
        <ThemedTitle>Trigger fields</ThemedTitle>
        <Text>
          To make triggers as relevant to the user as possible you can let users provide one or more trigger fields. For
          example, the "New tweet by you with hashtag" trigger would require a trigger field to specify the hashtag to
          look for. Read the full documentation on trigger fields.
        </Text>

        {triggerFields && (
          <FlatList
            data={triggerFields ?? []}
            renderItem={({ item }) => (
              <EditableCell
                title={item?.label ?? ''}
                onEditClick={() => {
                  setCurrentField(item);
                  setShowEditField(true);
                }}
              />
            )}
          />
        )}

        {showCreateField && showEditField ? null : (
          <View style={styles.addFields}>
            <Button onPress={() => setShowCreateField(true)}>Add trigger fields</Button>
          </View>
        )}

        {renderCreateEditTriggerField()}

        <Divider />
      </Box>
      <Box marginY={5}>
        <ThemedTitle>Expose fields</ThemedTitle>
        <Text>Expose fields are parts of data that about to expose to `if-then` action.</Text>

        {exposeFields && (
          <FlatList
            data={exposeFields ?? []}
            renderItem={({ item }) => (
              <EditableCell
                title={item?.label ?? ''}
                onEditClick={() => {
                  setCurrentExposeField(item);
                  setShowEditExposeField(true);
                }}
              />
            )}
          />
        )}

        {showCreateExposeField && showEditExposeField ? null : (
          <View style={styles.addFields}>
            <Button onPress={() => setShowCreateExposeField(true)}>Add expose fields</Button>
          </View>
        )}

        {renderCreateEditTriggerExposeField()}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addFields: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});
