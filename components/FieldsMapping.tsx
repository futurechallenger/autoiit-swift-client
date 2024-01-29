import { Button, FlatList, HStack, IconButton, Input, Popover, Pressable, Text, View } from 'native-base';
import * as React from 'react';

import { getFieldMappingItemsByFieldId } from '../redux/gql/getFieldMappingItemsByFieldIdSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import * as Types from '../redux/types.generated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EditFieldMapping } from './EditFieldMapping';
import { updateFieldMappingItem } from '../redux/gql/updateFieldMappingItemSlice';
import { getActionMappingFieldList } from '../redux/gql/getActionMappingFieldListSlice';

interface Props {
  actionOutputField: Types.ActionOutputField;
  exposeFields: Types.ExposeField[];
  autoFlowId: Int;
  onSave: (items) => void;
  onUpdate: (item) => void;
}

const { useRef, useState, useEffect } = React;

export const FieldsMapping: React.FunctionComponent<Props> = ({
  autoFlowId,
  actionOutputField,
  exposeFields,
  onSave,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [fieldMapping, setFieldMapping] = useState<{ [x: string]: any }>();
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
  const {
    actionMappingFieldList,
    status: actionMappingFieldListStatus,
    error: actionMappingFieldListError,
  } = useAppSelector((state: RootState) => state.actionMappingFieldList);

  const {
    fieldMappingItems,
    status: mappingStatus,
    error: mappingError,
  } = useAppSelector((state: RootState) => state.fieldMappingItemsByFieldId);

  useEffect(() => {
    dispatch(getActionMappingFieldList({ flowId: autoFlowId }));
    return () => {
      setIsOpen(false);
      setIsEditOpen(false);
    };
  }, []);

  useEffect(() => {
    setFields(exposeFields);
  }, [exposeFields]);

  useEffect(() => {
    if (actionOutputField?.id) {
      dispatch(getFieldMappingItemsByFieldId({ actionInputFieldId: actionOutputField?.id }));
    }
  }, [actionOutputField]);

  useEffect(() => {
    if (!actionOutputField?.id) {
      return;
    }

    if (!fieldMappingItems) {
      setFieldMapping({});
      return;
    }

    const mappings = {};
    fieldMappingItems[actionOutputField.id]?.forEach((el: Types.FieldMappingItem) => {
      // mappings[`${el.id}`] = (!el?.exposeFieldId ? el.value : el.exposeLabel) as string;
      mappings[`${el.id}`] = el;
    });

    setFieldMapping(mappings ?? {});
  }, [fieldMappingItems, actionOutputField]);

  useEffect(() => {
    if (!actionMappingField || !actionOutputField?.id) {
      return;
    }

    dispatch(getActionMappingField({ actionInputFieldId: actionOutputField?.id }));
  }, [actionMappingField, actionOutputField]);

  const handleMappingSave = () => {
    console.log('>>> on click field mapping save button');
    if (!mappingInputRef.current?.value) {
      // TODO: remove this item
      return;
    }

    setFieldMapping({
      ...fieldMapping,
      [generateKey(mappingInputRef.current?.value)]: mappingInputRef.current?.value,
    });
  };

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
    const fieldOptions = Object.entries(fieldMapping ?? {}).map(([key, value]) => {
      const isToUpdate = key?.indexOf('-') < 0;

      if (value?.id) {
        return {
          id: isToUpdate ? parseInt(key, 10) : null,
          exposeFieldId: /*isToUpdate ? value?.exposeFieldId :*/ value?.id,
          exposeLabel: /*isToUpdate ? value?.exposeLabel : */ value?.keyName,
          actionInputFieldId: isToUpdate ? value?.actionInputFieldId : actionOutputField?.id,
        };
      }

      return {
        id: isToUpdate ? value?.id : null,
        value,
        actionInputFieldId: isToUpdate ? value?.actionInputFieldId : actionOutputField?.id,
      };
    });

    if (onSave) {
      onSave(fieldOptions);
    }
  };

  const handleRemoveMapping = (mappingId: string) => {
    console.log('remove field mappings', mappingId);
    dispatch(removeFieldMappingItem({ mappingId: parseInt(mappingId, 10) }));
  };

  const handleUpdateItem = (mappingItem: { key: string; value: Types.FieldMappingItem | {} }) => {
    const { key, value } = mappingItem;
    if (key.indexOf('-') > 0) {
      setFieldMapping({ ...fieldMapping, [key]: value });
    } else {
      console.log('>>>>>update object in state');
      dispatch(updateFieldMappingItem({ mappingItem: value }));
    }
  };

  const handleUpdateMapping = (mapping) => {
    console.log('update field mapping');
  };

  const renderFieldPresentation = () => {
    if (!fieldMapping || fieldMapping.length <= 0) {
      return;
    }

    return Object.entries(fieldMapping).map(([key, value]) => {
      const fi = value;

      return (
        <HStack key={key}>
          <Pressable>
            <Text>{value?.label ?? value?.value ?? value?.exposeLabel}</Text>
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

  const handleItemClick = (item: Types.ExposeField) => {
    console.log('item clicked');
    setFieldMapping({ ...fieldMapping, [generateKey(item?.id ?? '')]: item });
  };

  const generateKey = (itemId: number | string) => `${actionOutputField?.id}-${itemId}-${refCount.current++}`;

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
