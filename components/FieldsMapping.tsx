import { Button, FlatList, Input, Popover, Pressable, Text, View } from 'native-base';
import * as React from 'react';

import { getFieldMappingItemsByFieldId } from '../redux/gql/getFieldMappingItemsByFieldIdSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import * as Types from '../redux/types.generated';

interface Props {
  actionField: Types.ActionInputField;
  exposeFields: Types.ExposeField[];
  onSave: (items) => void;
  onUpdate: (item) => void;
}

const { useRef, useState, useEffect } = React;

type FieldMappingType = { key: string; item: string | Types.ExposeField };

export const FieldsMapping: React.FunctionComponent<Props> = ({ actionField, exposeFields, onSave, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [fieldMapping, setFieldMapping] = useState<{ [x: string]: any }>();
  const refCount = useRef(0);
  const popoverRef = useRef(null);
  const mappingInputRef = useRef(null);

  const dispatch = useAppDispatch();
  const { count, status, error } = useAppSelector((state: RootState) => state.addFieldOptions);

  const {
    fieldMappingItems,
    status: mappingStatus,
    error: mappingError,
  } = useAppSelector((state: RootState) => state.fieldMappingItemsByFieldId);

  useEffect(() => {
    return () => setIsOpen(false);
  }, []);

  useEffect(() => {
    setFields(exposeFields);
  }, [exposeFields]);

  useEffect(() => {
    if (actionField?.id) {
      dispatch(getFieldMappingItemsByFieldId({ actionInputFieldId: actionField?.id }));
    }
  }, [actionField]);

  useEffect(() => {
    if (!actionField?.id) {
      return;
    }

    if (!fieldMappingItems) {
      setFieldMapping({});
      return;
    }

    const mappings = {};
    fieldMappingItems[actionField.id]?.forEach((el: Types.FieldMappingItem) => {
      mappings[`${el.id}`] = (!el?.exposeFieldId ? el.value : el.exposeLabel) as string;
    });

    setFieldMapping(mappings ?? {});
  }, [fieldMappingItems, actionField]);

  const handleMappingSave = () => {
    console.log('>>> on click field mapping save button');
    if (!mappingInputRef.current?.value) {
      // TODO: remove this item
      return;
    }

    setFieldMapping({
      ...fieldMapping,
      [generateKey()]: mappingInputRef.current?.value,
    });
  };

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
    const fieldOptions = Object.entries(fieldMapping ?? {}).map(([_, value]) => {
      if (value?.id) {
        return {
          exposeFieldId: value?.id,
          exposeLabel: value?.keyName,
          actionInputFieldId: actionField?.id,
        };
      }

      return {
        value,
        actionInputFieldId: actionField?.id,
      };
    });

    if (onSave) {
      onSave(fieldOptions);
    }
  };

  const handle = () => {
    console.log('>>> on click field mapping save button');
    if (!mappingInputRef.current?.value) {
      // TODO: remove this item
      return;
    }

    setFieldMapping({
      ...fieldMapping,
      [generateKey()]: mappingInputRef.current?.value,
    });
  };

  const renderFieldPresentation = () => {
    if (!fieldMapping || fieldMapping.length <= 0) {
      return;
    }

    return Object.entries(fieldMapping).map(([key, value]) => {
      const fi = value;
      if (fi?.id) {
        return (
          <Pressable key={key}>
            <Text>{fi?.label}</Text>
          </Pressable>
        );
      }
      return (
        <Pressable key={key}>
          <Text>{fi}</Text>
        </Pressable>
      );
    });
  };

  const handleItemClick = (item: Types.ExposeField) => {
    console.log('item clicked');
    setFieldMapping({ ...fieldMapping, [generateKey()]: item });
  };

  const generateKey = (itemId?: number) => `${actionField?.id}-${itemId ?? refCount.current++}`;

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
            <Input ref={mappingInputRef} id={`${actionField?.id}`} />
            <FlatList
              data={fields ?? []}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleItemClick(item)}>
                  <View>
                    <Text>{item?.label}</Text>
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
