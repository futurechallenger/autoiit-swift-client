import * as React from "react";
import { View, Text } from "native-base";

interface ThemedTitleProps {
  children: string;
}

export const ThemedTitle: React.FunctionComponent<ThemedTitleProps> = ({
  children,
}) => {
  return (
    <Text fontSize="20" fontWeight="bold">
      {children}
    </Text>
  );
};

interface InputTitleProps {
  children: string;
}

export const InputTitle: React.FunctionComponent<InputTitleProps> = ({
  children,
}) => {
  return (
    <Text fontSize={15} color="black" fontWeight="bold">
      {children}
    </Text>
  );
};

interface ThemedDescriptionProps {
  children: string;
}

export const ThemedDescription: React.FunctionComponent<
  ThemedDescriptionProps
> = ({ children }) => {
  return <Text color="muted.500">{children}</Text>;
};
