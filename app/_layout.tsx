import { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Fonts from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from '@/redux/store';
import '../global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Fonts.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error('Preparing app error: ', e);
      } finally {
        console.log('Preparing app done');
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  } else {
    SplashScreen.hide();
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          <GluestackUIProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              {/* <SessionProvider> */}
              <Stack>
                {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
                <Stack.Screen name="password" options={{ headerShown: false }} />
                <Stack.Screen
                  name="choose-service"
                  options={{
                    presentation: 'modal',
                    title: '',
                    headerLeft: () => {
                      return (
                        <TouchableOpacity onPress={() => router.dismiss()}>
                          <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                      );
                    },
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              {/* </SessionProvider> */}
              <StatusBar style="auto" />
            </ThemeProvider>
          </GluestackUIProvider>
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
