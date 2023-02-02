import * as React from "react";
import { View, Text } from "native-base";
import { NavContainer, NavScene } from "../../../components/NavContainer";
import { ActionListScene } from "./ActionListScene";
import { CreateActionScene } from "./CreateActionScene";
import { ActionDetailScene } from "./ActionDetailScene";

const { useState } = React;

export const ActionsScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};

  return (
    <NavContainer>
      <NavScene
        name="ActionList"
        component={ActionListScene}
        params={{ serviceApi }}
        isDefault
      />
      <NavScene name="CreateAction" component={CreateActionScene} />
      <NavScene name="ActionDetail" component={ActionDetailScene} />
    </NavContainer>
  );
};
