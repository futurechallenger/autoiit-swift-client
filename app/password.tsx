import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Spinner, Text, useToast } from 'native-base';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import * as React from 'react';
import { Pressable } from 'react-native';
// import { AuthContext } from '../navigation/AuthContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { FormControl, FormControlLabelText, FormControlLabel } from '@/components/ui/form-control';

const { useState, useContext, useEffect } = React;

export default function Password() {
  const dispatch = useAppDispatch();
  const { exists } = useLocalSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const { token: signInToken, status: signInStatus } = useAppSelector((state: RootState) => state.signIn);
  const { token: loginToken, status: loginStatus } = useAppSelector((state: RootState) => state.login);

  console.log('>>>local search params', JSON.stringify(exists ?? {}));

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  // const navigation = useNavigation();
  // const authContext = useContext(AuthContext);

  const toast = useToast();

  // const route = useRoute<PasswordScreenRouteProp>();
  // const { exists } = route.params;

  useEffect(() => {
    const storeItem = async () => {
      const token = signInToken?.signIn || loginToken?.loginIn;
      if (!token) {
        return;
      }

      await AsyncStorage.setItem('@token', token);
      // authContext.setAuthToken(token);

      // navigation.replace('Tabs');
    };

    storeItem();
  }, [signInToken, loginToken]);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleClick = async () => {
    try {
      const email = await AsyncStorage.getItem('@email');
      if (!email) {
        return;
      }

      // if (!exists?.userInfo) {
      // res = await signIn({ userInfo: { email, password: text } }).unwrap();
      // dispatch(signIn({ userInfo: { email, password: text } }));
      // } else {
      // res = await login({ userInfo: { email, password: text } }).unwrap();
      // dispatch(login({ userInfo: { email, password: text } }));
      // }

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

  // const headingText = exists?.userInfo ? "Welcome back! What's your password" : 'Create your password';
  // const buttonTitle = exists?.userInfo ? 'Login' : 'SignIn';

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
            {/* <FormControlLabelText className='text-30 font-extrabold'>Enter Your Password</FormControlLabelText> */}
            <Heading>Enter Your Password</Heading>
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
            <ButtonText>OK</ButtonText>
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
