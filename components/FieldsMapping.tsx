import * as React from 'react';
import {
  Input,
  Button,
  View,
  Text,
  Popover,
  FlatList,
  Pressable,
} from 'native-base';
import * as Types from '../redux/types.generated';
import { ActionFieldInput } from '../screens/developer/actions/ActionFieldInput';

interface Props {
  actionFieldId: number;
  exposeFields: Types.ExposeField[];
}

const { useRef, useState, useEffect } = React;

type FieldMappingType = { key: string; item: string | Types.ExposeField };

export const FieldsMapping: React.FunctionComponent<Props> = ({
  actionFieldId,
  exposeFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [fieldMapping, setFieldMapping] = useState<{ [x: string]: any }>();
  const refCount = useRef(0);
  const popoverRef = useRef(null);
  const mappingInputRef = useRef(null);

  useEffect(() => {
    return () => setIsOpen(false);
  }, []);

  useEffect(() => {
    setFields(exposeFields);
  }, [exposeFields]);

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
  };

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

  const generateKey = () => `${actionFieldId}-${refCount.current++}`;

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
            <Input ref={mappingInputRef} id={`${actionFieldId}`} />
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
              <Button
                colorScheme="coolGray"
                variant="ghost"
                onPress={() => setIsOpen(false)}
              >
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
