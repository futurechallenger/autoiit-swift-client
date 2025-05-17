import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import Animated from 'react-native-reanimated';

interface DataItem {
  id: string;
  title: string;
}

interface SearchServiceProps {
  // Add any props needed here
}

const SearchService: React.FC<SearchServiceProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<DataItem[]>([]); // Replace with your actual data

  const handleCancel = () => {
    setSearchText('');
  };

  const renderItem = ({ item }: { item: DataItem }) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="text-gray-800">{item.title}</Text>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center mb-4">
        <Animated.View sharedTransitionTag="searchInput">
          <HStack className="flex-1">
            <Input className="flex-1 border border-gray-300 rounded-lg p-3 mr-2" variant="outline">
              <InputField
                autoFocus
                placeholder="Search..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={setSearchText}
              />
            </Input>
            {/* <TouchableOpacity onPress={handleCancel} className="p-2 rounded-lg w-[60px]">
              <Text className="text-blue-600 font-medium w-[60px]">Cancel</Text>
            </TouchableOpacity> */}
            <Button>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </HStack>
        </Animated.View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-grow"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        testID="service-list"
      />
    </View>
  );
};

export default SearchService;
