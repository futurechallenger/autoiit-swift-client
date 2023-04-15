import * as React from 'react';
import { View, Text } from 'native-base';
import { WebView } from 'react-native-webview';
import { SERVER_URL } from '../Lib/config';
import { useRoute } from '@react-navigation/native';

export const PopupScreen = () => {
  const route = useRoute();
  const { serviceId } = route?.params ?? {};
  return (
    <View flex="1">
      <WebView
        source={{ uri: `${SERVER_URL}/login/${serviceId}/service` }}
        // source={{ uri: `${SERVER_URL}/login/${service.id}/service` }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          alert(data?.source);
        }}
      />
    </View>
  );
};
