import * as React from 'react';
import { Pressable, FlatList, Input, Button, View, Text, Popover, IconButton } from 'native-base';

import * as Types from '../redux/types.generated';
import Ionicons from '@expo/vector-icons/Ionicons';

const { useRef, useState, useEffect } = React;

interface Props {
  mappingItem: { key: string; value: Types.FieldMappingItem | {} };
  fields?: Types.FieldMappingItem[];
  onSave: (item) => void;
}

export const EditFieldMapping: React.FunctionComponent<Props> = ({ mappingItem, fields, onSave }) => {
  const popoverRef = useRef(null);
  const mappingInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    if (!mappingItem) {
      return;
    }

    setCurrentItem(mappingItem);
  }, [mappingItem]);

  const handleItemClick = (item) => {
    console.log('>>> edit mapping', item);
    setCurrentItem({
      key: currentItem.key,
      value: {
        id: parseInt(currentItem.key, 10),
        exposeFieldId: item.id,
        exposeLabel: item.keyName,
        actionInputFieldId: currentItem.value.actionInputFieldId,
      },
    });
  };

  const handleMappingSave = () => {
    console.log('handle mapping save');
    if (onSave) {
      onSave(currentItem);
    }
  };

  return (
    <View>
      <Popover
        initialFocusRef={popoverRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        trigger={(props) => (
          <IconButton
            {...props}
            icon={<Ionicons name="ios-folder-sharp" size={20} />}
            borderRadius="full"
            onPress={() => setIsOpen(true)}
          />
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
    </View>
  );
};
