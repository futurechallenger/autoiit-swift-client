import { router } from 'expo-router';
import { Spinner, Text, useToast } from 'native-base';
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
import { signIn } from '@/redux/gql/signInSlice';
import { login } from '@/redux/gql/loginSlice';

const { useState, useEffect } = React;

export default function Password() {
  const dispatch = useAppDispatch();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const {
    token: signInToken,
    status: signInStatus,
    error: signInError,
  } = useAppSelector((state: RootState) => state.signIn);
  const {
    token: loginToken,
    status: loginStatus,
    error: loginError,
  } = useAppSelector((state: RootState) => state.login);
  const { userInfo } = useAppSelector((state: RootState) => state.userInfo);

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  // const navigation = useNavigation();
  // const authContext = useContext(AuthContext);

  const toast = useToast();

  // const route = useRoute<PasswordScreenRouteProp>();
  // const { exists } = route.params;

  useEffect(() => {
    if (signInToken || loginToken) {
      router.replace('/');
    }
  }, [signInToken, loginToken]);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleClick = async () => {
    try {
      // const email = await AsyncStorage.getItem('@email');
      // if (!email) {
      //   return;
      // }

      // if (!exists?.userInfo) {
      // res = await signIn({ userInfo: { email, password: text } }).unwrap();
      // dispatch(signIn({ userInfo: { email, password: text } }));
      // } else {
      // res = await login({ userInfo: { email, password: text } }).unwrap();
      // dispatch(login({ userInfo: { email, password: text } }));
      // }

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
      {(signInStatus === 'loading' || loginStatus === 'loading') && <Spinner size="lg" />}
      {signInStatus === 'error' &&
        toast.show({
          render: () => {
            return <Box className="bg-primary-500 p-5">Hello! Have a nice day</Box>;
          },
        })}
    </Box>
  );
}

// const PasswordToggle = ({ show, toggleShow }: { show: boolean; toggleShow: () => void }) => {
//   const handlePress = () => {
//     toggleShow();
//   };

//   return (
//     <Pressable onPress={handlePress}>
//       <Icon
//         as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
//         size={5}
//         mr={2}
//         color="muted.400"
//       />
//     </Pressable>
//   );
// };
