import * as React from 'react';
import { View, Text } from 'native-base';
import { WebView } from 'react-native-webview';
import { SERVER_URL } from '../Lib/config';

export const PopupScreen = () => {
  return (
    <View flex="1">
      <WebView
        source={{ uri: `${SERVER_URL}/login/1/service` }}
        // source={{ uri: `${SERVER_URL}/login/${service.id}/service` }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          alert(data?.source);
        }}
      />
    </View>
  );
};
