import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { NavContainer, NavScene } from '../../../components/NavContainer';
import { CreateTriggerScene } from './CreateTriggerScene';
import { TriggerDetailScene } from './TriggerDetailScene';
import { TriggerGeneralScene } from './TriggerGeneralScene';

const { useState, useEffect } = React;

const Stack = createNativeStackNavigator();

interface Props {
  params: any;
  focusScene: boolean;
}

export const TriggersScene: React.FunctionComponent<Props> = ({
  params,
  focusScene,
}) => {
  const { serviceApi } = params ?? {};

  return (
    <NavContainer containerId="triggers-nav" needsReset={focusScene}>
      <NavScene
        name="TriggerList"
        component={TriggerGeneralScene}
        params={{ serviceApi }}
        isDefault
      />
      <NavScene
        name="CreateTrigger"
        component={CreateTriggerScene}
        params={{ serviceApi }}
      />
      <NavScene
        name="TriggerDetail"
        component={TriggerDetailScene}
        params={{ serviceApi }}
      />
    </NavContainer>
  );
};
