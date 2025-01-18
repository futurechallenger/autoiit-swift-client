import * as React from 'react';
import { Stack, router } from 'expo-router';
import { View, Text, FlatList, Pressable } from 'native-base';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { getServices, getServicesSlice } from '@/redux/gql/chooseServices';
import { SearchIcon } from '@/components/ui/icon';

const { useEffect, useState } = React;

export default function ChooseServiceScreen() {
  const { services, error, status } = useAppSelector((state: RootState) => state.services);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const [inputText, setInputText] = useState('');

  const handleNav = (/*item*/) => {
    // if (phrase === 'Action') {
    //   navigation.navigate('Actions', { item, phrase });
    //   return;
    // }
    // navigation.navigate('Triggers', { item, phrase });
  };

  return (
    <View className="h-full w-full flex-1 justify-start items-center bg-white p-4">
      <Stack.Screen options={{ headerShown: true, title: 'Choose Service' }} />
      <HStack className="w-full p-x-4 bg-emerald-100">
        <Input className="flex-1 pr-2">
          <InputField placeholder="Search" />
          <InputSlot>
            <InputIcon as={SearchIcon} />
          </InputSlot>
        </Input>
        <Button
          className="ml-2"
          onPress={() => {
            dispatch(getServicesSlice.actions.searchByName(inputText));
          }}
        >
          <ButtonText>OK</ButtonText>
        </Button>
      </HStack>
      <View  className='h-20 w-full bg-sky-100' />
      <FlatList
        w="full"
        data={services ?? []}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNav(/*item*/)}>
            <View w="full" h={60} bg="pink.100" justifyContent="center" alignItems="center">
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
