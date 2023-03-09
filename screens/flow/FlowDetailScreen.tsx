import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Text, View, VStack } from 'native-base';
import * as React from 'react';

import { ThemedTitle } from '../../components/ThemedTitle';
import { getCurrentUserInfo } from '../../redux/gql/getCurrentUserInfoSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const { useEffect } = React;

export const FlowDetailScreen = () => {
  return (
    <View>
      <Text>Flow detail screen</Text>
    </View>
  );
};
