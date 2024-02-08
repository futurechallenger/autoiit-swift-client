import { Button, FlatList, HStack, IconButton, Input, Popover, Pressable, Text, View } from 'native-base';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import * as Types from '../redux/types.generated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EditFieldMapping } from './EditFieldMapping';

interface Props {
  actionOutputField: Types.ActionOutputField;
  actionMappingFieldList: Types.ActionMappingField[] | null | undefined;
  exposeFields: Types.ExposeField[];
  autoFlowId: number | null | undefined;
  onSave: (items: Types.ActionMappingField) => void;
}

const { useRef, useState, useEffect } = React;

export const FieldsMapping: React.FunctionComponent<Props> = ({
  autoFlowId,
  actionMappingFieldList,
  actionOutputField,
  exposeFields,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [fieldMapping, setFieldMapping] = useState<{ [key: string | number]: Types.ExposeField }>();
  const [currentActionMappingField, setCurrentActionMappingField] = useState<
    Types.ActionMappingField | null | undefined
  >();

  const refCount = useRef(0);
  const popoverRef = useRef(null);
  const mappingInputRef = useRef(null);

  const dispatch = useAppDispatch();
  const { count, status, error } = useAppSelector((state: RootState) => state.addFieldOptions);
  const {
    actionMappingField,
    status: updateActionMappingFieldStatus,
    error: updateActionMappingFieldError,
  } = useAppSelector((state: RootState) => state.updateActionMappingField);

  useEffect(() => {
    return () => {
      setIsOpen(false);
      setIsEditOpen(false);
    };
  }, []);

  useEffect(() => {
    setFields(exposeFields);
  }, [exposeFields]);

  useEffect(() => {
    if (!currentActionMappingField?.id || !currentActionMappingField?.exposeFieldInfo) {
      return;
    }

    const fieldMappingList = JSON.parse(currentActionMappingField.exposeFieldInfo ?? '[]');
    const parsedFieldMapping = fieldMappingList.reduce((acc: any, post: { id: string | number }) => {
      return { ...acc, [generateKey(post.id!)]: post };
    }, {});

    setFieldMapping(parsedFieldMapping);
  }, [currentActionMappingField?.id]);

  useEffect(() => {
    let theActionMappingField: Types.ActionMappingField | undefined = undefined;

    if (actionOutputField?.id && actionMappingFieldList) {
      for (const actionMappingField of actionMappingFieldList) {
        if (actionMappingField?.actionOutputFieldId === actionOutputField.id) {
          theActionMappingField = actionMappingField;
          break;
        }
      }
    }

    if (!theActionMappingField) {
      theActionMappingField = { actionOutputFieldId: actionOutputField.id!, autoFlowId };
    }

    setCurrentActionMappingField(theActionMappingField);
  }, [actionMappingFieldList, actionOutputField?.id]);

  const handleMappingSave = () => {
    console.log('>>> on click field mapping save button');
  };

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
    if (!fieldMapping || !currentActionMappingField) {
      return;
    }

    const fieldMappingList = Object.entries(fieldMapping || {}).map(([key, value]) => {
      return { id: value.id, keyName: value.keyName, name: value.label };
    });

    if (onSave) {
      onSave({ ...currentActionMappingField, exposeFieldInfo: JSON.stringify(fieldMappingList) });
    }
  };

  const handleRemoveMapping = (mappingId: string) => {
    console.log('remove field mappings', mappingId);
    if (!fieldMapping || !(mappingId in fieldMapping)) return;

    delete fieldMapping[mappingId];
    setFieldMapping({ ...fieldMapping });
  };

  const handleUpdateItem = (mappingItem: { key: string; value: Types.ExposeField | {} }) => {};

  const handleItemClick = (item: Types.ExposeField) => {
    console.log('item clicked');
    setFieldMapping({
      ...fieldMapping,
      [generateKey(item.id!)]: item,
    });
  };

  const generateKey = (itemId: number | string) => `${actionOutputField?.id}-${itemId}-${refCount.current++}`;

  const renderFieldPresentation = () => {
    if (!fieldMapping) {
      return;
    }

    return Object.entries(fieldMapping)?.map(([key, value]) => {
      return (
        <HStack key={key}>
          <Pressable>
            <Text>{value?.name ?? value?.label ?? ''}</Text>
          </Pressable>
          <IconButton
            icon={<Ionicons name="remove-circle" size={20} />}
            borderRadius="full"
            onPress={() => handleRemoveMapping(key)}
          />
          <EditFieldMapping fields={fields} mappingItem={{ key, value }} onSave={handleUpdateItem} />
        </HStack>
      );
    });
  };

  return (
    <View>
      <View>
        <Text>Preview: </Text>
        <View>{renderFieldPresentation()}</View>
      </View>
      <Popover
        initialFocusRef={popoverRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        trigger={(props) => (
          <Button {...props} onPress={() => setIsOpen(true)}>
            Add
          </Button>
        )}
      >
        <Popover.Content>
          <Popover.Header>Fields</Popover.Header>
          <Popover.Body>
            <Input ref={mappingInputRef} />
            <FlatList
              data={fields ?? []}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleItemClick(item)}>
                  <View>
                    <Text>{item?.keyName}</Text>
                  </View>
                </Pressable>
              )}
            />
          </Popover.Body>
          <Popover.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost" onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onPress={handleMappingSave}>Save</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>

      <View>
        <Button onPress={handleOK}>OK</Button>
      </View>
    </View>
  );
};
