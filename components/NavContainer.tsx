import * as React from "react";
import { View, Text } from "native-base";

const { useState } = React;

interface NavContainerProps {
  children: Array<React.ReactElement<any, any>>;
}

export const NavContainer: React.FunctionComponent<NavContainerProps> = ({
  children,
}) => {
  const [scene, setScene] = useState();
  if (!children) {
    return null;
  }

  let map = new Map();
  let defaultComponent: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (map.has(child.props.name)) {
      throw new Error(`${child.props.name} is duplicated`);
    }

    if (child.props.isDefault) {
      defaultComponent = child;
    }

    map.set(child.props.name, child.props.component);
  });

  if (!scene && defaultComponent) {
    const comp = defaultComponent as any;
    return comp?.props?.component({
      ...comp?.props?.params,
      setScene,
    });
  }

  let comp = map.get(scene);
  if (!comp) {
    return null;
  }

  return comp.props.component({ ...comp.props.params, setScene });
};

interface NavSceneProps {
  name: string;
  component: React.ReactElement;
  params?: object;
}

export const NavScene: React.FunctionComponent<NavSceneProps> = ({
  name,
  component,
}) => {
  return <View />;
};
