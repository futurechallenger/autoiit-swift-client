import * as React from 'react';
import {
  Center,
  Text,
  VStack,
  Button,
  Box,
  Container,
  Heading,
  Actionsheet,
  HStack,
  Modal,
  FormControl,
  Input,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../redux/hooks';
import { addUser } from '../redux/gql/addUserSlice';

const { useState, useRef } = React;

const AuthScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSelect = (selected: string) => {
    switch (selected) {
      case 'email':
        if (isOpen) setIsOpen(false);
        navigation.navigate('Email');
        break;
      case 'cancel':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    // dispatch(addUser({ user: {} }));
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView>
      <VStack space="2.5" mt="4" padding={4}>
        <HStack justifyContent="space-between">
          <Heading>Introduction of the app</Heading>
          <Button onPress={handleRegister}>Register</Button>
        </HStack>
        <Box>
          <Text>Stack aligns items vertically or horizontally based on the direction prop.</Text>
        </Box>
        <Center bg="primary.100" _text={{ color: 'white', fontWeight: 'bold' }}></Center>
        <Container>
          <Button onPress={handleClick}>Continue</Button>
        </Container>
        <Actionsheet isOpen={isOpen} onClose={handleClose}>
          <Actionsheet.Content>
            <Box w="100%" px={4} h={60} justifyContent="center">
              Continue with
            </Box>
            <Actionsheet.Item onPress={() => handleSelect('email')}>Email</Actionsheet.Item>
            <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item onPress={() => handleSelect('cancel')}>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input ref={initialRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
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
                  setModalVisible(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export { AuthScreen };
