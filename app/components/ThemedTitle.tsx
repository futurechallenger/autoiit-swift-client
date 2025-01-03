import * as React from 'react';
import { View, Text } from 'native-base';

interface ThemedTextProps {
  children: string | undefined | null;
  type?: 'title' | 'input-title' | 'sub-title' | 'description';
}

export const ThemedText: React.FunctionComponent<ThemedTextProps> = ({ children, type = 'description' }) => {
  let props = {};

  switch (type) {
    case 'title':
      props = { fontSize: 20, fontWeight: 'bold' };
      break;
    case 'sub-title':
    case 'input-title':
      props = { fontSize: 15 /*fontWeight: "bold"*/ };
      break;

    case 'description':
    default:
      props = { color: 'muted.500' };
      break;
  }

  return <Text {...props}>{children}</Text>;
};

interface ThemedTitleProps {
  children: string;
}

export const ThemedTitle: React.FunctionComponent<ThemedTitleProps> = ({ children }) => {
  return (
    <Text fontSize="20" fontWeight="bold">
      {children}
    </Text>
  );
};

interface InputTitleProps {
  children: string;
}

export const InputTitle: React.FunctionComponent<InputTitleProps> = ({ children }) => {
  return (
    <Text fontSize={15} color="black" fontWeight="bold">
      {children}
    </Text>
  );
};

interface ThemedDescriptionProps {
  children: string;
}

export const ThemedDescription: React.FunctionComponent<ThemedDescriptionProps> = ({ children }) => {
  return <Text color="muted.500">{children}</Text>;
};
