import { router } from 'expo-router';
import { Spinner, Text } from 'native-base';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import * as React from 'react';
import { Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { FormControl, FormControlLabelText, FormControlLabel } from '@/components/ui/form-control';
import { signIn, login } from '@/redux/gql/authSlice';
import { useToast } from '@/components/ui/toast';
import { showToast } from '@/components/showToast';

const { useState, useEffect } = React;

const PASSWORD_TOAST_ID = 'auth/password';

export default function Password() {
  const dispatch = useAppDispatch();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const { token, isAuthenticated, status, error } = useAppSelector((state: RootState) => state.signIn);
  const { userInfo } = useAppSelector((state: RootState) => state.userInfo);
  const [text, setText] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }

    if (error) {
      if (!toast.isActive(PASSWORD_TOAST_ID)) {
        showToast({
          toast,
          toastId: PASSWORD_TOAST_ID,
          content: "Something's wrong, please try again later.",
        });
      }
    }
  }, [isAuthenticated, error]);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleClick = async () => {
    try {
      if (!userInfo) {
        // signin
        dispatch(signIn({ userInfo: { email, password: passwordValue } }));
        return;
      }

      if (userInfo) {
        // login
        dispatch(login({ userInfo: { email, password: passwordValue } }));
        return;
      }
    } catch (e: any) {
      console.error('ERROR in login', e);
    }
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  const handlePress = () => {
    // TODO: forget password
  };

  const headingText = userInfo ? "Welcome back! What's your password" : 'Create your password';
  const buttonTitle = userInfo ? 'Login' : 'SignIn';

  return (
    <Box className="flex-1 justify-start items-center ">
      <Stack.Screen
        options={{
          title: 'Password',
          headerShown: true,
        }}
      />
      <VStack className=" w-full pt-6 px-6">
        <FormControl>
          <FormControlLabel>
            <Heading>{headingText}</Heading>
          </FormControlLabel>
          <Input className="text-center pt-3">
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
        <Box className="pt-8 ">
          <Button onPress={handleClick}>
            <ButtonText>{buttonTitle}</ButtonText>
          </Button>
          <Pressable onPress={handlePress} className="self-center py-2">
            <Text variant="labelSmall">Forget password?</Text>
          </Pressable>
        </Box>
      </VStack>
      {status === 'loading' && <Spinner size="lg" />}
    </Box>
  );
}
