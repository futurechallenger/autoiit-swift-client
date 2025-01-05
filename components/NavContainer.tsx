import * as React from 'react';
import { View, Text } from 'native-base';

const { useState, useMemo } = React;

interface SceneType {
  name: string;
  params: any;
}

interface NavContainerProps {
  containerId: string;
  children: Array<React.ReactElement<any, any>>;
}

export const NavContainer: React.FunctionComponent<NavContainerProps> = ({
  containerId,
  children,
}) => {
  const [scene, setScene] = useState<SceneType | undefined>();

  let defaultComponentName = useMemo(() => {
    let temp: string | undefined;

    React.Children.forEach(children, (child) => {
      if (child.props.isDefault) {
        temp = child.props.name;
        return;
      }
    });

    return temp;
  }, [containerId]);

  return (
    <>
      {React.Children.map(children, (child: any, index: number) => {
        const currentSceneName = scene?.name ?? defaultComponentName;
        return (
          <View
            style={[
              child.props.name !== currentSceneName
                ? { display: 'none' }
                : {
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                  },
            ]}
          >
            {child?.props?.component({
              params: {
                ...(child?.props?.params ?? {}),
                sceneParams: scene?.params,
                setScene,
              },
            })}
          </View>
        );
      })}
    </>
  );
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
