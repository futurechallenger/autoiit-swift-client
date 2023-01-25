import * as React from "react";
import {
  Alert,
  VStack,
  Stack,
  Box,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";

interface ThemedAlertProps {
  status?: "success" | "error" | "info" | "warning";
  text: string;
}

export const ThemedAlert: React.FunctionComponent<ThemedAlertProps> = ({
  status,
  text,
}) => {
  const alertStatus = status ?? "success";

  return (
    <Stack space={3} w="100%" maxW="400">
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
                color: "coolGray.600",
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </Stack>
  );
};
