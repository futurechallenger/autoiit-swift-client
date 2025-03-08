import * as React from 'react';
import { SectionList } from 'react-native';
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

const sections = [
  {
    title: 'Filters',
    data: [
      { id: 'filter_all', name: 'All' },
      { id: 'filter_new', name: 'New' },
      { id: 'filter_popular', name: 'Popular' },
    ],
    type: 'filters',
  },
  {
    title: 'Services',
    data: [
      { id: 'service_1', name: 'Business Tools', category: 'Business' },
      { id: 'service_2', name: 'Contacts Sync', category: 'Communication' },
      { id: 'service_3', name: 'API Integrations', category: 'Developer' },
      { id: 'service_4', name: 'Analytics', category: 'Analytics' },
    ],
    type: 'services',
  },
];

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
      {/* <HStack className="w-full p-x-4 bg-emerald-100">
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
      </HStack> */}
      <SectionList
        className="w-full"
        sections={sections}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderSectionHeader={({ section }) => (
          <Text className="text-lg font-bold text-gray-800 mb-2 mt-4 px-2">{section.title}</Text>
        )}
        renderItem={({ item, section }) => (
          <Pressable onPress={() => handleNav(/*item*/)} className="mb-2">
            <View className="w-full h-16 bg-pink-100 rounded-lg justify-center items-center">
              <Text className="text-gray-800">{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
