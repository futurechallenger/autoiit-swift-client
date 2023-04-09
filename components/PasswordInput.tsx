import * as React from 'react';
import { Icon, Input, Pressable, Stack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const { forwardRef } = React;

const PasswordInput_ = (props: any, ref: React.ForwardedRef<HTMLInputElement>) => {
  const [show, setShow] = React.useState(false);

  return (
    <Stack space={4} w="100%" alignItems="center">
      <Input
        {...props}
        ref={ref}
        w={{
          base: '75%',
          md: '25%',
        }}
        type={show ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
      />
    </Stack>
  );
};

export const PasswordInput = forwardRef<HTMLInputElement, any>(PasswordInput_);
