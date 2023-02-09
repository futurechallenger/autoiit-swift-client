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
import { addActionInputField } from '../../../redux/gql/addActionInputFieldSlice';
import { getActionInputFields } from '../../../redux/gql/getActionInputFieldsSlice';
import { deleteServiceAction } from '../../../redux/gql/removeActionSlice';
import { removeActionInputField } from '../../../redux/gql/removeActionInputFieldSlice';
import { updateActionInputField } from '../../../redux/gql/updateActionInputFieldSlice';
import { updateServiceAction } from '../../../redux/gql/updateActionSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import * as Types from '../../../redux/types.generated';
import { ActionFieldInput } from './ActionFieldInput';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const ActionDetailScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { setScene, sceneParams, serviceApi } = params ?? {};
  // const { action } = sceneParams ?? {};
  const action = sceneParams;

  const dispatch = useAppDispatch();
  const { actionInputFields, status, error } = useAppSelector(
    (state: RootState) => state.actionInputFields,
  );
  const {
    actionInputField: addInputField,
    status: addStatus,
    error: addError,
  } = useAppSelector((state: RootState) => state.addActionInputField);
  const {
    actionInputField: updateInputField,
    status: updateStatus,
    error: updateError,
  } = useAppSelector((state: RootState) => state.updateActionInputField);

  const [name, setName] = useState<string | undefined>();
  const [currentField, setCurrentField] = useState<
    (Types.ActionInputField & Types.ActionOutputField) | undefined
  >();
  const [description, setDescription] = useState<string | undefined>();
  // const [endpointType, setEndpointType] = useState<string | undefined>();
  const [endpointPath, setEndpointPath] = useState<string | undefined>();
  const [showCreateField, setShowCreateField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);

  useEffect(() => {
    if (action?.id) {
      setName(action?.name);
      setDescription(action?.description);
      setEndpointPath(action?.endpointPath);

      dispatch(getActionInputFields({ actionId: action?.id }));
    }
  }, [action]);

  useEffect(() => {
    if (
      (addStatus === 'succeeded' || updateStatus === 'succeeded') &&
      action?.id
    ) {
      dispatch(getActionInputFields({ actionId: action?.id }));
    }
  }, [addStatus, updateStatus, action?.id]);

  const handleInput = (nextValue: string | undefined) => {
    setEndpointPath(nextValue);
  };

  const handleDeleteAction = () => {
    if (action?.id) {
      dispatch(deleteServiceAction({ actionId: action?.id }));
    }
  };

  const handleCreateActionInputField = (field: Types.ActionInputField) => {
    dispatch(addActionInputField({ f: field }));
  };

  const handleEditActionInputField = (field: Types.ActionInputField) => {
    dispatch(updateActionInputField({ actionInputField: field }));
  };

  const handleDeleteActionInputField = (fieldId: number) => {
    dispatch(removeActionInputField({ fieldId }));
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

  const renderCreateEditActionInputField = () => {
    if (showCreateField) {
      return (
        <ActionFieldInput
          key="create-field"
          actionInfo={action}
          onSave={handleCreateActionInputField}
          onCancel={() => setShowCreateField(false)}
        />
      );
    }

    if (showEditField) {
      return (
        <ActionFieldInput
          key="edit-field"
          actionInfo={action}
          fieldInfo={currentField}
          onSave={handleEditActionInputField}
          onDelete={handleDeleteActionInputField}
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
        description="Must be a complete sentence starting with “This action fires” and ending with a period"
        onTextChanged={(nextValue) => setDescription(nextValue)}
      />
      <VStack>
        <InputTitle>Endpoint</InputTitle>
        <InputGroup>
          <InputLeftAddon children={'https://'} />
          <Input value={endpointPath} onChangeText={handleInput} />
        </InputGroup>
        <Text>
          API endpoint for this action. Must be in snake_case and begin with a
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

        {actionInputFields && (
          <FlatList
            data={actionInputFields ?? []}
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
              Add action fields
            </Button>
          </View>
        )}

        {renderCreateEditActionInputField()}

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
