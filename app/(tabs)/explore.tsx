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
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

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

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  const handleSearchToggle = (active: boolean) => {
    searchProgress.value = withTiming(active ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    if (active) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    setIsSearchActive(active);
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

  const handleFocus = () => {
    // navigation.navigate('Search');
  };

  return (
    <View paddingX="5">
      <Stack.Screen options={{ headerShown: true, title: 'Explore' }} />

      {/* 搜索模式界面 */}
      <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0 }, searchStyle]}>
        <View p="$4" bg="$white">
          <HStack alignItems="center">
            <Input variant="rounded" size="md" style={{ flex: 1 }}>
              <InputField
                ref={inputRef}
                placeholder="Search services..."
                value={searchText}
                onChangeText={setSearchText}
              />
            </Input>
            <Button ml="$2" onPress={() => handleSearchToggle(false)}>
              <Text>取消</Text>
            </Button>
          </HStack>
        </View>
        {/* 搜索结果列表 */}
        {isSearchActive && (
          <FlatList
            data={null}
            renderItem={({ item }) => (
              <ServiceCell
                item={item}
                handleItemClick={() => {
                  console.log('Searched items is clicked');
                }}
              />
            )}
          />
        )}
      </Animated.View>

      {/* 原始界面 */}
      <Animated.View style={originalStyle}>
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
      </Animated.View>
      {status === 'loading' && <Text>Loading...</Text>}
      {(error || mostSearchedError) && <Text>{error || mostSearchedError}</Text>}
    </View>
  );
}

const ListHeader = ({ onSearchFocus }: { onSearchFocus: any }) => {
  const params = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>('All');

  useEffect(() => {
    setSelectedService(params.name || 'All');
  }, [params]);

  return (
    <View className="px-4 pb-2 bg-white">
      {/* 搜索框 */}
      {/* <Input onFocus={onSearchFocus} className="border rounded-lg p-2"  /> */}
      <Input variant="outline" size="md" className="mt-5 rounded-lg">
        <InputField placeholder="Search services..." />
      </Input>
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
