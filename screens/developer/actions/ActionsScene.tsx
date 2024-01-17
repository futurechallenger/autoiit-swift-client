import * as React from 'react';
import { View, Text } from 'native-base';
import { NavContainer, NavScene } from '../../../components/NavContainer';
import { ActionListScene } from './ActionListScene';
import { CreateActionScene } from './CreateActionScene';
import { ActionDetailScene } from './ActionDetailScene';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

const { useState, useEffect } = React;

export const ActionsScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};

  useEffect(() => {}, [serviceApi?.id]);

  return (
    <NavContainer containerId="actions-nav">
      <NavScene name="ActionList" component={ActionListScene} params={{ serviceApi }} isDefault />
      <NavScene name="CreateAction" component={CreateActionScene} params={{ serviceApi }} />
      <NavScene name="ActionDetail" component={ActionDetailScene} params={{ serviceApi }} />
    </NavContainer>
  );
};
