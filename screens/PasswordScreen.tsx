import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Heading, Icon, Input, Pressable, Spinner, Text, VStack, ZStack } from 'native-base';
import * as React from 'react';

import { AuthContext } from '../navigation/AuthContext';
import { login } from '../redux/gql/loginService';
import { signIn } from '../redux/gql/signInService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { PasswordScreenRouteProp } from '../types';

const { useState } = React;

const PasswordScreen = () => {
  const dispatch = useAppDispatch();
  const { token: signInToken, status: signInStatus } = useAppSelector((state: RootState) => state.signIn);
  const { token: loginToken, status: loginStatus } = useAppSelector((state: RootState) => state.login);

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);

  const route = useRoute<PasswordScreenRouteProp>();
  const { exists } = route.params;

  React.useEffect(() => {
    const storeItem = async () => {
      const token = signInToken?.signIn || loginToken?.loginIn;
      if (!token) {
        return;
      }

      await AsyncStorage.setItem('@token', token);
      authContext.setAuthToken(token);
    };

    storeItem();
    // navigation.reset("Tabs");
  }, [signInToken, loginToken]);

  const handleClick = async () => {
    try {
      const email = await AsyncStorage.getItem('@email');
      if (!email) {
        return;
      }

      if (!exists?.userinfo) {
        // res = await signIn({ userInfo: { email, password: text } }).unwrap();
        dispatch(signIn({ userInfo: { email, password: text } }));
      } else {
        // res = await login({ userInfo: { email, password: text } }).unwrap();
        dispatch(login({ userInfo: { email, password: text } }));
      }

      // const token = res?.signIn || res?.loginIn;

      // if (!token) {
      //   throw Error("Something's wrong when login");
      // }

      // AsyncStorage.setItem("@token", token);
      // authContext.setAuthToken(token);

      // navigation.reset("Tabs");
    } catch (e: any) {
      console.error('ERROR in login', e);
      // setShowError(true);
      setError(e);
    }
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  const handlePress = () => {
    // TODO: forget password
  };

  const headingText = exists?.userinfo ? "Welcome back! What's your password" : 'Create your password';
  const buttonTitle = exists?.userinfo ? 'Login' : 'SignIn';

  return (
    <ZStack flex="1" justifyContent="center" alignItems="center">
      <VStack paddingX="4" space="10" paddingY="5" position="absolute" top="0" w="full">
        <Heading>{headingText}</Heading>
        <Box>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Your password"
            InputRightElement={<PasswordToggle show={show} toggleShow={() => setShow(!show)} />}
            onChangeText={handleChangeText}
          />
        </Box>
        <Box>
          <Button onPress={handleClick}>{buttonTitle}</Button>
          <Pressable onPress={handlePress} alignSelf="center" paddingY={2}>
            <Text fontWeight="bold" fontSize="11">
              Forget password?
            </Text>
          </Pressable>
        </Box>
      </VStack>
      {(signInStatus === 'loading' || loginStatus === 'loading') && <Spinner size="lg" />}
    </ZStack>
  );
};

const PasswordToggle = ({ show, toggleShow }: { show: boolean; toggleShow: () => void }) => {
  const handlePress = () => {
    toggleShow();
  };

  return (
    <Pressable onPress={handlePress}>
      <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr={2} color="muted.400" />
    </Pressable>
  );
};

export { PasswordScreen };
