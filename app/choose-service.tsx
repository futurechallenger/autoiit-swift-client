import * as React from 'react';
import { SectionList, TextInput, Modal, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { View, Text, FlatList } from 'native-base';
import { HStack } from '@/components/ui/hstack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { getServices, getServicesSlice } from '@/redux/gql/chooseServices';

const { useEffect, useState } = React;

type ServiceType = { id: string; name: string };

const recommendedServices = Array.from({ length: 10 }, (_, i) => ({
  id: `recommended-${i}`,
  name: `Service ${i + 1}`,
}));

const availableServices = Array.from({ length: 5 }, (_, i) => ({
  id: `available-${i}`,
  name: `Available Service ${i + 1}`,
}));

const sections = [
  {
    title: 'Recommended Services',
    data: recommendedServices,
  },
  {
    title: 'Available Services',
    data: availableServices,
  },
];

export default function ChooseServiceScreen() {
  const { services, error, status } = useAppSelector((state: RootState) => state.services);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const handleNav = (item: { id: string; name: string }) => {
    console.log('Item pressed:', item);
    router.push(`/services/triggers/${item.id}`);
  };

  const renderServiceItem = ({ item }: { item: ServiceType }) => (
    <Pressable onPress={() => handleNav(item)} className="mb-2 p-2">
      <View className="h-16 bg-pink-100 rounded-lg justify-center items-center">
        <Text className="text-gray-800">{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View className="h-full w-full flex-1 justify-start items-center bg-white p-4">
      <Stack.Screen options={{ headerShown: true, title: 'Choose a service' }} />

      <View className="w-full mb-4">
        <TextInput
          className="w-full h-10 border border-gray-300 rounded-lg px-4"
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            if (text.length > 0) {
              setIsModalVisible(true);
            } else {
              setIsModalVisible(false);
            }
          }}
        />
      </View>

      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View className="flex-1 justify-center items-center p-4 bg-white">
          <Text className="text-lg font-bold mb-4">Search Results for: {searchText}</Text>
          <Pressable onPress={() => setIsModalVisible(false)} className="px-4 py-2 bg-blue-500 rounded-lg">
            <Text className="text-white">Close</Text>
          </Pressable>
        </View>
      </Modal>

      <SectionList
        className="w-full"
        sections={sections}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderSectionHeader={({ section }) => (
          <Text className="text-lg font-bold text-gray-800 mb-2 mt-4 px-2">{section.title}</Text>
        )}
        renderItem={renderServiceItem}
      />
    </View>
  );
}
