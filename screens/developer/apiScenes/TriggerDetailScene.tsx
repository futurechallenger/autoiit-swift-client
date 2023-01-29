import * as React from "react";
import {
  Icon,
  Box,
  Button,
  VStack,
  View,
  Text,
  Divider,
  InputGroup,
  InputLeftAddon,
  Input,
  HStack,
  Pressable,
  FlatList,
  IconButton,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { TriggerFieldInput } from "./TriggerFieldInput";
import * as Types from "../../../redux/types.generated";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { addTriggerField } from "../../../redux/gql/addTriggerFieldSlice";
import { updateTriggerField } from "../../../redux/gql/updateTriggerFieldSlice";
import { getTriggerFields } from "../../../redux/gql/getTriggerFieldsSlice";
import { Entypo } from "@expo/vector-icons";
import { deleteTriggerField } from "../../../redux/gql/removeTriggerFieldSlice";
import { current } from "@reduxjs/toolkit";
import { EditableCell } from "../../../components/EditableCell";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

const { useState, useEffect } = React;

export const TriggerDetailScene = () => {
  const route = useRoute();
  const { trigger, serviceApi } = route.params ?? {};

  const dispatch = useAppDispatch();
  const { triggerFields, status, error } = useAppSelector(
    (state: RootState) => state.triggerFields
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
    setName(trigger.name);
    setDescription(trigger.description);
    setEndpointPath(trigger.endpointPath);
    setEndpointType(trigger.endpointType);
  }, []);

  useEffect(() => {
    if (trigger?.id) {
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [trigger?.id]);

  useEffect(() => {
    if (
      (addStatus === "succeeded" || updateStatus === "succeeded") &&
      trigger?.id
    ) {
      dispatch(getTriggerFields({ triggerId: trigger?.id }));
    }
  }, [addStatus, updateStatus, trigger?.id]);

  const handleInput = (nextValue) => {
    setEndpointPath(nextValue);
  };

  const handleDeleteTrigger = () => {
    // dispatch(deleteTriggerField)
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

  const renderTriggerFields = () => {
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
          fieldInfo={currentField}
          onSave={handleEditTriggerField}
          onDelete={handleDeleteTriggerField}
          onCancel={() => setShowEditField(false)}
        />
      );
    }
  };

  return (
    // <View style={{ overflow: "scroll" }}>
    <View style={{ overflow: "scroll" }}>
      <ThemedTitle>{trigger.name}</ThemedTitle>
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
        <ThemedTitle>Endpoint</ThemedTitle>
        <InputGroup>
          <InputLeftAddon children={"https://"} />
          <Input value={endpointPath} onChangeText={handleInput} />
        </InputGroup>
        <Text>
          API endpoint for this trigger. Must be in snake_case and begin with a
          letter.
        </Text>
      </VStack>
      <Divider />
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h={60}
      >
        <Pressable onPress={handleDeleteTrigger}>
          <View style={styles.deleteButton}>
            <Ionicons name="trash" size={28} color="muted.50" />
            <Text color="muted.500">Delete trigger</Text>
          </View>
        </Pressable>
        <Button>Save</Button>
      </HStack>
      <Box>
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
                title={item?.label ?? ""}
                onEditClick={() => {
                  setCurrentField(item);
                  setShowEditField(true);
                }}
              />
            )}
          />
        )}

        {showCreateField && showEditField ? null : (
          <Button onPress={() => setShowCreateField(true)}>
            Add trigger fields
          </Button>
        )}

        {renderTriggerFields()}
        <Divider />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
