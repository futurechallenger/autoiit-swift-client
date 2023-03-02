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

interface Props {
  exposeFields: Types.ExposeField[];
}

const { useRef, useState, useEffect } = React;

type FieldMappingType = string | Types.ExposeField;

export const FieldsMapping: React.FunctionComponent<Props> = ({
  exposeFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [fieldMapping, setFieldMapping] = useState<FieldMappingType[]>([]);
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
    // setText(mappingInputRef.current?.value);
    if (!mappingInputRef.current?.value) {
      return;
    }

    setFieldMapping([...fieldMapping, mappingInputRef.current?.value]);
  };

  const focusRef = useRef(null);

  const renderFieldPresentation = () => {
    if (!fieldMapping || fieldMapping.length <= 0) {
      return;
    }

    return fieldMapping.map((fi) => {
      if (fi?.id) {
        return (
          <Pressable key={fi?.id}>
            <Text>{fi?.label}</Text>
          </Pressable>
        );
      }
      return (
        <Pressable key={`string-${fi}`}>
          <Text>{fi}</Text>
        </Pressable>
      );
    });
  };

  const handleItemClick = (item) => {
    console.log('item clicked');
    setFieldMapping([...fieldMapping, item]);
  };

  return (
    <View>
      <View>
        <Text>Preview: </Text>
        <View>{renderFieldPresentation()}</View>
      </View>
      <Popover
        initialFocusRef={focusRef}
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
