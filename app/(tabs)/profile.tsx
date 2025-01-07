import * as React from 'react';
import { Stack } from 'expo-router';
import { Modal, Button, View, Text, VStack, Box, Pressable, FlatList } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultAvatar } from '@/components/DefaultAvatar';
import { router } from 'expo-router';

const profileItems = [
  'avatar',
  'Account',
  'My Flows',
  'My services',
  'Archive',
  'Widgets',
  'Sync options',
  'Rate Autoiit',
  'Help center',
  'Sign out',
  'footer',
];

const { useState } = React;

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (param: string) => {
    if (param === 'Sign out') {
      setModalVisible(true);

      return;
    } else if (param === 'My Flows') {
      router.push('/flows');
      return;
    }

    router.push('/account');
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }}>
        <FlatList
          w="full"
          data={profileItems}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (
                <View flex={1} alignSelf="center" paddingY={10}>
                  <Box bg="red">
                    <Box
                      style={{
                        borderRadius: 80,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      bg="indigo.500"
                    >
                      <DefaultAvatar />
                      <Pressable
                        style={{
                          backgroundColor: 'black',
                          opacity: 0.5,
                          marginTop: -40,
                          width: 130,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => console.log('Change avatar')}
                      >
                        <Text style={{ marginTop: -10 }} color="white">
                          Edit
                        </Text>
                      </Pressable>
                    </Box>
                  </Box>
                </View>
              );
            } else if (index === profileItems.length - 1) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                  }}
                >
                  <View
                    bg="red"
                    w="full"
                    h="50"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingX={5}
                  >
                    <Pressable>
                      <Text>Terms</Text>
                    </Pressable>
                    <View>
                      <Text>v0.1.1</Text>
                    </View>
                  </View>
                  <View style={{ height: 100 }} />
                </View>
              );
            } else {
              return (
                <Pressable onPress={() => handleItemPress(item)}>
                  <View
                    bg="fuchsia.500"
                    borderBottomWidth={1}
                    h="66"
                    justifyContent="center"
                    alignItems="flex-start"
                    paddingLeft={5}
                  >
                    <View paddingRight={10} bg="red">
                      <Text fontWeight="bold" fontSize={20}>
                        {item}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }
          }}
        />
      </View>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Logout</Modal.Header>
          <Modal.Body>
            <Text>You will logout your account!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  AsyncStorage.removeItem('@token');
                  AsyncStorage.removeItem('@email');
                  setModalVisible(false);
                  // router.push('/my-flow', { refresh: true });
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
