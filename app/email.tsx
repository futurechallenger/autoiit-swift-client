import * as React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon, HelpCircleIcon, CloseIcon } from '@/components/ui/icon';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../redux/gql/userInfoSlice';
import { RootState } from '../redux/store';
import { Toast, useToast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import { showToast } from '@/components/showToast';

const { useState, useEffect } = React;
const EMAIL_TOAST_ID = 'auth/email';

export default function EmailScreen() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state: RootState) => state.userInfo);
  const [text, setText] = useState<string>('');
  const [email, setEmail] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!email || !status || status === 'loading') return;
    if (status === 'succeeded') {
      console.log('Status value is succeeded');

      router.push({ pathname: '/password', params: { email } });
      return;
    }
    if (error) {
      if (!toast.isActive(EMAIL_TOAST_ID)) {
        showToast({ toast, toastId: EMAIL_TOAST_ID, content: "Something's wrong, please try again later." });
      }
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
      // toast.show({ description: 'Error' });
    }
  };

  const handleChangeText = (newText: string) => {
    // TODO: check if it is a valid email address
    setText(newText);
  };

  const showNewToast = () => {
    toast.show({
      id: EMAIL_TOAST_ID,
      placement: 'bottom',
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast
            action="error"
            variant="outline"
            nativeID={uniqueToastId}
            className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
          >
            <HStack space="md">
              <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
              <VStack space="xs">
                <ToastTitle className="font-semibold text-error-500">Error!</ToastTitle>
                <ToastDescription size="sm">Something went wrong.</ToastDescription>
              </VStack>
            </HStack>
            <Pressable onPress={() => toast.close(id)}>
              <Icon as={CloseIcon} />
            </Pressable>
          </Toast>
        );
      },
    });
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
    </Box>
  );
}
