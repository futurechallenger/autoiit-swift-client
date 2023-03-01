import * as React from 'react';
import { Input, Button, View, Text, Popover, FlatList } from 'native-base';
import * as Types from '../redux/types.generated';

interface Props {
  exposeFields: Types.ExposeField[];
}

const { useRef, useState, useEffect } = React;

export const FieldsMapping: React.FunctionComponent<Props> = ({
  exposeFields,
}) => {
  const [fields, setFields] = useState<Types.ExposeField[]>();
  const [text, setText] = useState<string | undefined>();

  useEffect(() => {
    setFields(exposeFields);
  });

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
  };

  const handleMappingSave = () => {
    console.log('>>> on click field mapping save button');
  };

  const focusRef = useRef(null);

  return (
    <View>
      <View>
        <Text>Preview: {text}</Text>
        <View></View>
      </View>
      <Popover
        initialFocusRef={focusRef}
        trigger={(props) => <Button {...props}>Add</Button>}
      >
        <Popover.Content>
          <Popover.Header>Fields</Popover.Header>
          <Popover.Body>
            <Input onChangeText={(t) => setText(t)} />
            <FlatList
              data={fields ?? []}
              renderItem={({ item }) => (
                <View>
                  <Text>{item?.name}</Text>
                </View>
              )}
            />
          </Popover.Body>
          <Popover.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost">
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
