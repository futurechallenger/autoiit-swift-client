import * as React from 'react';
import { Alert, VStack, Stack, Box, HStack, Text, IconButton, CloseIcon } from 'native-base';
import { StyleSheet } from 'react-native';

interface ThemedAlertProps {
  status?: 'success' | 'error' | 'info' | 'warning';
  text: string;
  open: boolean;
  onClose: () => void;
}

export const ThemedAlert: React.FunctionComponent<ThemedAlertProps> = ({ status, text, open, onClose }) => {
  const alertStatus = status ?? 'success';

  if (open) {
    return (
      <Stack space={3} w="full" maxW="400" style={styles.alert}>
        <Alert w="100%" status={alertStatus}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {text}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
                onPress={() => onClose()}
              />
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
