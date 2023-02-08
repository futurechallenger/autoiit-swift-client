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
import { updateTriggerField } from '../../../redux/gql/updateTriggerFieldSlice';
import { updateServiceTrigger } from '../../../redux/gql/updateTriggerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import * as Types from '../../../redux/types.generated';
import { TriggerFieldInput } from './TriggerFieldInput';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const TriggerDetailScene: React.FunctionComponent<Props> = ({
  params,
}) => {
  const { serviceApi, sceneParams, setScene } = params ?? {};
  const trigger = sceneParams;

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector(
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

  const [name, setName] = useState();
  const [currentField, setCurrentField] = useState<
    Types.TriggerField | undefined
  >();
  const [description, setDescription] = useState();
  const [endpointType, setEndpointType] = useState();
  const [endpointPath, setEndpointPath] = useState();
  const [showCreateField, setShowCreateField] = useState(false);
  const [showEditField, setShowEditField] = useState(false);

  useEffect(() => {
    if (trigger?.id) {
      setName(trigger?.name);
      setDescription(trigger?.description);
      setEndpointPath(trigger?.endpointPath);
      setEndpointType(trigger?.endpointType);
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [trigger]);

  useEffect(() => {
    if (
      (addStatus === 'succeeded' || updateStatus === 'succeeded') &&
      trigger?.id
    ) {
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [addStatus, updateStatus, trigger?.id]);

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
          To make triggers as relevant to the user as possible you can let users
          provide one or more trigger fields. For example, the "New tweet by you
          with hashtag" trigger would require a trigger field to specify the
          hashtag to look for. Read the full documentation on trigger fields.
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
            <Button onPress={() => setShowCreateField(true)}>
              Add trigger fields
            </Button>
          </View>
        )}

        {renderCreateEditTriggerField()}

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
