import * as React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Box, Button, HStack, View, Text, FlatList, Spinner } from 'native-base';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { exploreService, getMostSearchedServices } from '@/redux/gql/searchService';
import { ServiceCell } from '@/components/ServiceCell';
// import { useNavigation } from '@react-navigation/native';
import { REQUEST_COUNT } from '@/lib/config';

const { useEffect, useState } = React;

export default function ExploreScreen() {
  const [condition, setCondition] = useState('');
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { services, error, status } = useAppSelector((state: RootState) => state.exploreServices);
  const {
    services: mostSearchedServices,
    error: mostSearchedError,
    status: mostSearchedStatus,
  } = useAppSelector((state: RootState) => state.mostSearchedServices);

  useEffect(() => {
    dispatch(
      exploreService({
        count: REQUEST_COUNT,
        sinceId: null,
        untilId: null,
        name: condition,
      }),
    );
    dispatch(getMostSearchedServices());
  }, []);

  const handleItemClick = (item: any) => {};

  const handleFocus = () => {
    // navigation.navigate('Search');
  };

  return (
    <View paddingX="5">
      <Stack.Screen options={{ headerShown: true, title: 'Explore' }} />
      <FlatList
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={20}
        data={services ?? []}
        renderItem={({ item }) => <ServiceCell item={item} handleItemClick={handleItemClick} />}
        ListHeaderComponent={<ListHeader onSearchFocus={handleFocus} />}
        ListFooterComponent={status === 'loading' || mostSearchedStatus === 'loading' ? <Spinner /> : null}
        onEndReached={
          () => {}
          // dispatch(
          //   exploreService({
          //     count: REQUEST_COUNT,
          //     untilId: services?.[REQUEST_COUNT - 1]?.id ?? 0,
          //     sinceId: undefined,
          //     name: condition,
          //   })
          // )
        }
      />
      {status === 'loading' && <Text>Loading...</Text>}
      {(error || mostSearchedError) && <Text>{error || mostSearchedError}</Text>}
    </View>
  );
}

const ListHeader = ({ onSearchFocus }: { onSearchFocus: any }) => {
  const params = useLocalSearchParams<{ selectedService: string }>();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>('All');

  useEffect(() => {
    setSelectedService(params.selectedService || 'All');
  }, [params]);

  return (
    <View className="px-4 pb-2 bg-white">
      {/* 搜索框 */}
      <Input onFocus={onSearchFocus} className="border rounded-lg p-2" placeholder="Search services..." />

      {/* 服务类型选择按钮 */}
      <Pressable
        onPress={() => router.push('/choose-service')}
        className="mt-2 border rounded-lg p-2 flex-row justify-between items-center bg-white"
      >
        <Text className="text-gray-600">{selectedService}</Text>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="#6b7280" /> */}
      </Pressable>
    </View>
  );
};
