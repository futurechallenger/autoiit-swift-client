import * as React from 'react';
import { Pressable, TouchableOpacity, useWindowDimensions } from 'react-native';
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
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import SearchService from '@/components/search-service';

const { useEffect, useState } = React;

export default function ExploreScreen() {
  const router = useRouter();
  const [condition, setCondition] = useState('');
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { services, error, status } = useAppSelector((state: RootState) => state.exploreServices);
  const {
    services: mostSearchedServices,
    error: mostSearchedError,
    status: mostSearchedStatus,
  } = useAppSelector((state: RootState) => state.mostSearchedServices);

  const searchProgress = useSharedValue(0);
  const inputRef = React.useRef(null);

  // 搜索界面动画
  const searchStyle = useAnimatedStyle(() => ({
    opacity: searchProgress.value,
    transform: [{ translateY: searchProgress.value * -20 }],
  }));

  // 原界面动画
  const originalStyle = useAnimatedStyle(() => ({
    opacity: 1 - searchProgress.value,
  }));

  const handleSearchToggle = () => {
    // searchProgress.value = withTiming(active ? 1 : 0, {
    //   duration: 300,
    //   easing: Easing.out(Easing.cubic),
    // });
    // if (active) {
    //   setTimeout(() => inputRef.current?.focus(), 100);
    // }
    // setIsSearchActive(active);
  };

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

  return (
    <View className="flex-1 px-5 justify-start">
      <Stack.Screen options={{ headerShown: true, title: 'Explore' }} />
      <FlatList
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={20}
        data={services ?? []}
        renderItem={({ item }) => <ServiceCell item={item} handleItemClick={handleItemClick} />}
        ListHeaderComponent={<ListHeader onSearchClicked={handleSearchToggle} />}
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

const ListHeader = ({ onSearchClicked }: { onSearchClicked: () => void }) => {
  const params = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>('All');

  const { width: screenWidth } = useWindowDimensions();
  const searchWidth = useSharedValue(screenWidth);

  const searchInputStyle = useAnimatedStyle(() => ({
    width: searchWidth.value,
  }));

  useEffect(() => {
    setSelectedService(params.name || 'All');
  }, [params]);

  return (
    <View className="px-4 pb-2 bg-white">
      {/* 搜索框 */}
      <Animated.View sharedTransitionTag="searchInput" style={[{ flex: 1 }, searchInputStyle]}>
        <Pressable
          onPress={onSearchClicked}
          className="mt-5 h-10 bg-gray-100 rounded-lg flex-row items-center px-3"
        >
          <HStack space={2} alignItems="center" flex={1}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <Text className="text-gray-500">Search services...</Text>
          </HStack>
        </Pressable>
      </Animated.View>
      {/* 服务类型选择按钮 */}
      <Pressable
        onPress={() => console.log('Search input clicked')}
        className="mt-2 border rounded-lg p-2 flex-row justify-between items-center bg-white"
      >
        <Text className="text-gray-600">{selectedService}</Text>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="#6b7280" /> */}
      </Pressable>
    </View>
  );
};
