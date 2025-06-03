import * as React from 'react';
import { Button, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Center, Text, VStack, Box, Container, Actionsheet, HStack, Modal, FormControl } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signIn, clearToken } from '@/redux/gql/authSlice';
import { RootState } from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSession } from '@/hooks/ctx';
import { ThemedPasswordInput } from '@/components/ThemedPasswordInput';

const { useState, useRef, useEffect } = React;

export default function Auth() {
  const { signIn: signInSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const nameInputRef = useRef(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const finalRef = useRef(null);
  const dispatch = useAppDispatch();

  const { token, status, error } = useAppSelector((state: RootState) => state.signIn);

  useEffect(() => {
    const storeItem = async () => {
      if (token?.signIn) {
        signInSession(token.signIn);
        dispatch(clearToken());
        router.replace('/');
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
      <Stack.Screen options={{ headerShown: false }} />
      <VStack space="2.5" mt="4" padding={4}>
        <HStack justifyContent="space-between">
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Introduction of the app</Text>
        </HStack>
        <Box>
          {/* TODO: replace this text */}
          <Text>Stack aligns items vertically or horizontally based on the direction prop.</Text>
        </Box>
        <Center bg="primary.100" _text={{ color: 'white', fontWeight: 'bold' }}></Center>
        <Container>
          <Button onPress={handleClick} title="Continue" />
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
            <FormControl></FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <TextInput
                placeholder="Name"
                ref={nameInputRef}
                onChangeText={(v) => setNameValue(v)}
                value={nameValue}
                style={{
                  height: '100%',
                  fontSize: 16,
                  color: '#1f2937',
                }}
                placeholderTextColor="#9ca3af"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <ThemedPasswordInput value={passwordValue} onChangeText={(v: string) => setPasswordValue(v)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
              title="Cancel"
            />
            <Button onPress={handleRegister} title="Save" />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
