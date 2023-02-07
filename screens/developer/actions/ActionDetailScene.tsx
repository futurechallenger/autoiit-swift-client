import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { current } from '@reduxjs/toolkit';
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
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
import { addTriggerField } from '../../../redux/gql/addTriggerFieldSlice';
import { getTriggerFields } from '../../../redux/gql/getTriggerFieldsSlice';
import { deleteTriggerField } from '../../../redux/gql/removeTriggerFieldSlice';
import { deleteTrigger } from '../../../redux/gql/removeTriggerSlice';
import { updateServiceAction } from '../../../redux/gql/updateActionSlice';
import { updateTriggerField } from '../../../redux/gql/updateTriggerFieldSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import * as Types from '../../../redux/types.generated';
import { TriggerFieldInput } from '../apiScenes/TriggerFieldInput';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const ActionDetailScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { action, setScene, serviceApi } = params ?? {};

  const dispatch = useAppDispatch();
  const { actionFields, status, error } = useAppSelector(
    (state: RootState) => state.triggerFields,
  );
  const {
    triggerField: addField,
    status: addStatus,
    error: addError,
  } = useAppSelector((state: RootState) => state.addTriggerField);
  const {
    triggerField: updateField,
    status: updateStatus,
    error: updateError,
  } = useAppSelector((state: RootState) => state.addTriggerField);

  const [name, setName] = useState<string | undefined>();
  const [currentField, setCurrentField] = useState<
    Types.TriggerField | undefined
  >();
  const [description, setDescription] = useState<string | undefined>();
  // const [endpointType, setEndpointType] = useState<string | undefined>();
  const [endpointPath, setEndpointPath] = useState<string | undefined>();
  const [showCreateField, setShowCreateField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);

  useEffect(() => {
    setName(action?.name);
    setDescription(action?.description);
    setEndpointPath(action?.endpointPath);
    // setEndpointType(action?.endpointType);
  }, []);

  useEffect(() => {
    if (action?.id) {
      dispatch(getTriggerFields({ triggerId: action?.id }));
    }
  }, [action?.id]);

  useEffect(() => {
    if (
      (addStatus === 'succeeded' || updateStatus === 'succeeded') &&
      action?.id
    ) {
      dispatch(getTriggerFields({ triggerId: action?.id }));
    }
  }, [addStatus, updateStatus, action?.id]);

  const handleInput = (nextValue: string | undefined) => {
    setEndpointPath(nextValue);
  };

  const handleDeleteAction = () => {
    // dispatch(deleteAction({ actionId: action?.id }));
  };

  const handleCreateActionField = (field: Types.TriggerField) => {
    dispatch(addTriggerField({ field }));
  };

  const handleEditActionField = (field: Types.TriggerField) => {
    dispatch(updateTriggerField({ field }));
  };

  const handleDeleteActionField = (fieldId: number) => {
    dispatch(deleteTriggerField({ fieldId }));
  };

  const handleUpdateAction = () => {
    const targetAction = {
      id: action?.id,
      name,
      description,
      endpointPath,
      serviceApiId: serviceApi?.id,
    };
    dispatch(updateServiceAction({ action: targetAction }));
  };

  const renderCreateEditActionField = () => {
    if (showCreateField) {
      return (
        <TriggerFieldInput
          key="create-field"
          triggerInfo={action}
          onSave={handleCreateActionField}
          onCancel={() => setShowCreateField(false)}
        />
      );
    }

    if (showEditField) {
      return (
        <TriggerFieldInput
          key="edit-field"
          triggerInfo={action}
          fieldInfo={currentField}
          onSave={handleEditActionField}
          onDelete={handleDeleteActionField}
          onCancel={() => setShowEditField(false)}
        />
      );
    }
  };

  return (
    <View>
      <ThemedTitle>{action?.name ?? ''}</ThemedTitle>
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
          <InputLeftAddon children={'https://'} />
          <Input value={endpointPath} onChangeText={handleInput} />
        </InputGroup>
        <Text>
          API endpoint for this trigger. Must be in snake_case and begin with a
          letter.
        </Text>
      </VStack>
      <Divider marginTop={5} />
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h={60}
        marginY={5}
      >
        <Pressable onPress={handleDeleteAction}>
          <View style={styles.deleteButton}>
            <Ionicons name="trash" size={28} color="muted.50" />
            <Text color="muted.500">Delete action</Text>
          </View>
        </Pressable>
        <Button onPress={handleUpdateAction}>Save</Button>
      </HStack>
      <Box marginY={5}>
        <ThemedTitle>Action fields</ThemedTitle>
        <Text>
          To make action as relevant to the user as possible you can let users
          provide one or more action fields. For example, the "New tweet by you
          with hashtag" action would require a action field to specify the
          hashtag to look for. Read the full documentation on action fields.
        </Text>

        {actionFields && (
          <FlatList
            data={actionFields ?? []}
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
            <Button onPress={() => setShowCreateField(true)}>
              Add trigger fields
            </Button>
          </View>
        )}

        {renderCreateEditActionField()}

        <Divider />
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
