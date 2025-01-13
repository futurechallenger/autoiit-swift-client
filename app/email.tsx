import * as React from 'react';
import { VStack, Box, useToast, Spinner, ZStack, Button, Heading, Row as Snackbar, Text } from 'native-base';
import { Input, InputField } from '@/components/ui/input';
import { View } from 'react-native';
import { router } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { EmailScreenNavigationProp } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../redux/gql/userInfoSlice';
import { RootState } from '../redux/store';
import Toast from 'react-native-toast-message';

const { useState, useEffect } = React;

/**
 * TODO:
 * 1. Only when the email address is valid
 * Enable the `Continue` button to
 * navigate the next page
 * 2. check if the email is registered.
 * If it is, show login in next screen.
 * If not, show `Create account` there
 */
export default function EmailScreen() {
  const dispatch = useAppDispatch();
  const { userInfo, status } = useAppSelector((state: RootState) => state.userInfo);
  // const navigation = useNavigation<EmailScreenNavigationProp>();
  const [text, setText] = useState<string>('');
  const toast = useToast();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!email || !status || status === 'loading') return;
    if (status === 'succeeded') {
      console.log('Status value is succeeded');

      // navigation.navigate('Password', { exists: userInfo });
      router.push('/passowrd', { exists: userInfo });
      return;
    }
  }, [email, status]);

  const handleClick = async () => {
    if (!text) {
      return;
    }

    try {
      // await AsyncStorage.setItem('@email', text ?? '');
      setEmail(text);

      dispatch(getUserInfo({ email: text }));
    } catch (e) {
      console.error('E:', e);
      toast.show({ description: 'Error' });
    }
  };

  const handleChangeText = (newText: string) => {
    // TODO: check if it is a valid email address
    setText(newText);
  };

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
    >
      <VStack flex="1">
        <ZStack flex="1" flexDirection="column" justifyContent="center" alignItems="center">
          <VStack paddingX="4" paddingTop={5} w="full" space="10" position="absolute" top="0">
            <Heading>What's your email</Heading>
            <Box>
              <Input variant='outline'>
                <InputField placeholder="Email" onChangeText={handleChangeText} />
              </Input>
            </Box>
          </VStack>

          {status === 'loading' && <Spinner size="lg" />}
        </ZStack>
        <Box paddingBottom={10} paddingX="5">
          <Button onPress={handleClick}>Continue</Button>
        </Box>
      </VStack>
      {/* {status === 'failed' && <Toast />} */}
      <Toast />
    </View>
  );
}
