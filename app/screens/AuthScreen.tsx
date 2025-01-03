import * as React from 'react';
import { Platform } from 'react-native';
import {
  Heading,
  Center,
  Text,
  Button,
  VStack,
  Box,
  Container,
  Actionsheet,
  HStack,
  Modal,
  FormControl,
  Input,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PasswordInput } from '../components/PasswordInput';
import { signIn } from '../redux/gql/signInService';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { useState, useRef, useEffect } = React;

const AuthScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { token, status, error } = useAppSelector((state: RootState) => state.signIn);

  useEffect(() => {
    const storeItem = async () => {
      if (token?.signIn) {
        await AsyncStorage.setItem('@token', token?.signIn);
      }
    };

    storeItem();
  }, [token]);

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
    setModalVisible(false);
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!email || !password) {
      return;
    }

    dispatch(
      signIn({
        userInfo: {
          name,
          email,
          password,
        },
      }),
    );
  };

  return (
    <SafeAreaView>
      <VStack space="2.5" mt="4" padding={4}>
        <HStack justifyContent="space-between">
          <Heading>Introduction of the app</Heading>
          {Platform.OS !== 'web' && <Button onPress={() => setModalVisible(!modalVisible)}>Register</Button>}
        </HStack>
        <Box>
          {/* TODO: replace this text */}
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
        initialFocusRef={nameInputRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input ref={nameInputRef} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input ref={emailInputRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <PasswordInput ref={passwordInputRef} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button.Group space={2}> */}
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={handleRegister}>
              Save
            </Button>
            {/* </Button.Group> */}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export { AuthScreen };
