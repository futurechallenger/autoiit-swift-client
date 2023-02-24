import * as React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  Pressable,
  Input,
  HStack,
} from 'native-base';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { getServices, getServicesSlice } from '../redux/gql/chooseServices';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { useEffect, useState } = React;

export const ChooseServiceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { phrase } = route.params ?? {};
  const { services, error, status } = useAppSelector(
    (state: RootState) => state.services,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const [inputText, setInputText] = useState('');

  const handleNav = (item) => {
    if (phrase === 'Action') {
      navigation.navigate('Actions', { item });
      return;
    }

    navigation.navigate('Triggers', { item });
  };

  return (
    <View h="full" w="full" justifyContent="center" alignItems="center">
      <Text>Choose Service</Text>
      <HStack marginY={10}>
        <Input
          placeholder="Search"
          onChangeText={(text) => setInputText(text)}
          InputRightElement={
            <View marginRight={2}>
              <Ionicons name="search" size={20} />
            </View>
          }
        />
        <Button
          marginLeft={2}
          onPress={() => {
            dispatch(getServicesSlice.actions.searchByName(inputText));
          }}
        >
          <Text>OK</Text>
        </Button>
      </HStack>
      <FlatList
        w="full"
        data={services ?? []}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNav(item)}>
            <View
              w="full"
              h={60}
              bg="pink.100"
              justifyContent="center"
              alignItems="center"
            >
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
