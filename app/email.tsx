import * as React from 'react';
import { useToast, Spinner, Row as Snackbar, Text } from 'native-base';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../redux/gql/userInfoSlice';
import { RootState } from '../redux/store';
import Toast from 'react-native-toast-message';

const { useState, useEffect } = React;

export default function EmailScreen() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: RootState) => state.userInfo);
  const [text, setText] = useState<string>('');
  const toast = useToast();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!email || !status || status === 'loading') return;
    if (status === 'succeeded') {
      console.log('Status value is succeeded');

      router.push({ pathname: '/password' });
      return;
    }
  }, [email, status]);

  const handleClick = async () => {
    if (!text) {
      return;
    }

    try {
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
    <Box className="flex-1 justify-start items-start">
      <VStack className="flex-1 w-full p-6">
        <Heading>What's your email</Heading>
        <Box className="pt-3">
          <Input variant="outline">
            <InputField placeholder="Email" onChangeText={handleChangeText} />
          </Input>
        </Box>
        <Box className="py-8">
          <Button onPress={handleClick}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </Box>
      </VStack>
      {/* {status === 'failed' && <Toast />} */}
      <Toast />
    </Box>
  );
}
