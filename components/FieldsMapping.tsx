import { Button, FlatList, HStack, IconButton, Input, Popover, Pressable, Text, View } from 'native-base';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import * as Types from '../redux/types.generated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EditFieldMapping } from './EditFieldMapping';
import { updateFieldMappingItem } from '../redux/gql/updateFieldMappingItemSlice';
import { current } from '@reduxjs/toolkit';

interface Props {
  actionOutputField: Types.ActionOutputField;
  actionMappingFieldList: Types.ActionMappingField[] | null | undefined;
  exposeFields: Types.ExposeField[];
  autoFlowId: Int;
  onSave: (items) => void;
  onUpdate: (item) => void;
}

const { useRef, useState, useEffect } = React;

type FieldMappingType = {
  id: string | null | undefined;
  keyName: string | null | undefined;
  name: string | null | undefined;
};

export const FieldsMapping: React.FunctionComponent<Props> = ({
  autoFlowId,
  actionMappingFieldList,
  actionOutputField,
  exposeFields,
  onSave,
  onUpdate,
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
    if (actionOutputField.id && actionMappingFieldList) {
      for (const actionMappingField of actionMappingFieldList) {
        if (actionMappingField?.actionOutputFieldId === actionOutputField.id) {
          setCurrentActionMappingField(actionMappingField);
        }
      }
    }

    return () => {
      setIsOpen(false);
      setIsEditOpen(false);
    };
  }, []);

  useEffect(() => {
    setFields(exposeFields);
  }, [exposeFields]);

  // useEffect(() => {
  //   if (actionOutputField?.id) {
  //     dispatch(getFieldMappingItemsByFieldId({ actionInputFieldId: actionOutputField?.id }));
  //   }
  // }, [actionOutputField]);

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

  // useEffect(() => {
  //   if (!actionMappingField || !actionOutputField?.id) {
  //     return;
  //   }
  // }, [actionMappingField, actionOutputField]);

  const handleMappingSave = () => {
    console.log('>>> on click field mapping save button');
    // if (!mappingInputRef.current?.value) {
    //   // TODO: remove this item
    //   return;
    // }

    // setFieldMapping({
    //   ...fieldMapping,
    //   [generateKey(mappingInputRef.current?.value)]: mappingInputRef.current?.value,
    // });
  };

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
    // const fieldOptions = Object.entries(fieldMapping ?? {}).map(([key, value]) => {
    //   const isToUpdate = key?.indexOf('-') < 0;

    //   if (value?.id) {
    //     return {
    //       id: isToUpdate ? parseInt(key, 10) : null,
    //       exposeFieldId: /*isToUpdate ? value?.exposeFieldId :*/ value?.id,
    //       exposeLabel: /*isToUpdate ? value?.exposeLabel : */ value?.keyName,
    //       actionInputFieldId: isToUpdate ? value?.actionInputFieldId : actionOutputField?.id,
    //     };
    //   }

    //   return {
    //     id: isToUpdate ? value?.id : null,
    //     value,
    //     actionInputFieldId: isToUpdate ? value?.actionInputFieldId : actionOutputField?.id,
    //   };
    // });

    // if (onSave) {
    //   onSave(fieldOptions);
    // }
  };

  const handleRemoveMapping = (mappingId: string) => {
    console.log('remove field mappings', mappingId);
    if (!fieldMapping || !(mappingId in fieldMapping)) return;

    delete fieldMapping[mappingId];
    setFieldMapping({ ...fieldMapping });
  };

  const handleUpdateItem = (mappingItem: { key: string; value: Types.ExposeField | {} }) => {
    // const { key, value } = mappingItem;
    // if (key.indexOf('-') > 0) {
    //   setFieldMapping({ ...fieldMapping, [key]: value });
    // } else {
    //   console.log('>>>>>update object in state');
    //   dispatch(updateFieldMappingItem({ mappingItem: value }));
    // }
  };

  // const handleUpdateMapping = (mapping) => {
  //   console.log('update field mapping');
  // };

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
            <Text>{value.label ?? ''}</Text>
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
