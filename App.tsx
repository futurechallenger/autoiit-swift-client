import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { api } from "./redux/baseApi";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { NativeBaseProvider } from "native-base";
import { theme } from "./constants/theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApiProvider api={api}>
          <NativeBaseProvider theme={theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </NativeBaseProvider>
        </ApiProvider>
      </SafeAreaProvider>
    );
  }
}
