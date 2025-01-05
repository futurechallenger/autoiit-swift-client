import * as React from 'react';
import { Platform, TextInput } from 'react-native';
import { Center, Text, VStack, Box, Container, Actionsheet, HStack, Modal, FormControl } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PasswordInput } from '@/components/PasswordInput';
import { signIn } from '@/redux/gql/signInService';
import { RootState } from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import {router} from 'expo-router';

const { useState, useRef, useEffect } = React;

const AuthScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const nameInputRef = useRef(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
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

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSelect = (selected: string) => {
    switch (selected) {
      case 'email':
        if (isOpen) setIsOpen(false);
        // navigation.navigate('Email');
        router.push('/email');
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

    if (!emailValue || !passwordValue) {
      return;
    }

    dispatch(
      signIn({
        userInfo: {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        },
      }),
    );

    setNameValue('');
    setEmailValue('');
    setPasswordValue('');
  };

  return (
    <SafeAreaView>
      <VStack space="2.5" mt="4" padding={4}>
        <HStack justifyContent="space-between">
          <Heading>Introduction of the app</Heading>
          {Platform.OS !== 'web' && (
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <ButtonText>Register</ButtonText>
            </Button>
          )}
        </HStack>
        <Box>
          {/* TODO: replace this text */}
          <Text>Stack aligns items vertically or horizontally based on the direction prop.</Text>
        </Box>
        <Center bg="primary.100" _text={{ color: 'white', fontWeight: 'bold' }}></Center>
        <Container>
          <Button onPress={handleClick}>
            <ButtonText>Continue</ButtonText>
          </Button>
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
          <Modal.Header>Register</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField
                  placeholder="Name"
                  ref={nameInputRef}
                  onChangeText={(v) => setNameValue(v)}
                  value={nameValue}
                />
              </Input>
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Email" onChangeText={(v) => setEmailValue(v)} value={emailValue} />
              </Input>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input className="text-center">
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  onChangeText={(v) => setPasswordValue(v)}
                  value={passwordValue}
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button.Group space={2}> */}
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={handleRegister}>
              <ButtonText>Save</ButtonText>
            </Button>
            {/* </Button.Group> */}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export { AuthScreen };
