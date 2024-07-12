import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { PaperProvider } from 'react-native-paper';
import { store } from './redux/store';
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
          <PaperProvider>
            <NativeBaseProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </NativeBaseProvider>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
