import * as React from 'react';
import { Pressable, FlatList, Input, Button, View, Text, Popover, IconButton } from 'native-base';

import * as Types from '../redux/types.generated';
import Ionicons from '@expo/vector-icons/Ionicons';

const { useRef, useState, useEffect } = React;

interface Props {
  mappingItem: { key: string; value: Types.ExposeField | {} };
  fields?: Types.ExposeField[];
  onSave: (item) => void;
}

export const EditFieldMapping: React.FunctionComponent<Props> = ({ mappingItem, fields, onSave }) => {
  const popoverRef = useRef(null);
  const mappingInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ key: string; value: any }>();

  useEffect(() => {
    if (!mappingItem) {
      return;
    }

    setCurrentItem(mappingItem);
  }, [mappingItem]);

  const handleItemClick = (item: Types.ExposeField) => {
    console.log('>>> edit mapping', item);
    if (!currentItem?.key) {
      return;
    }

    setCurrentItem({
      key: currentItem!.key,
      value: {
        id: currentItem.key.indexOf('-') > 0 ? null : parseInt(currentItem!.key, 10),
        exposeFieldId: item.id,
        keyName: item.keyName,
        actionInputFieldId: currentItem?.value?.actionInputFieldId,
      },
    });
  };

  const handleMappingSave = () => {
    console.log('handle mapping save');
    if (onSave) {
      if (mappingInputRef.current?.value) {
        onSave({
          key: currentItem?.key,
          value: {
            id: currentItem?.key?.indexOf('-') > 0 ? null : parseInt(currentItem?.key, 10),
            value: mappingInputRef.current?.value,
            actionInputFieldId: currentItem?.value.actionInputFieldId,
          },
        });

        return;
      }
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
