import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from '@/hooks/useCachedResources';
import { useColorScheme } from '@/hooks/useColorScheme';
import Navigation from './navigation/_index';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from './redux/store';
import '../global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
// TODO: Theme
// import { theme } from "./constants/theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NativeBaseProvider>
            <GluestackUIProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </GluestackUIProvider>
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
