/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FindUserQuery } from "./redux/gql/userInfoSlice";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomStackParamList {}
  }
}

export type BottomStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof BottomStackParamList> =
  NativeStackScreenProps<BottomStackParamList, Screen>;

export type RootTabParamList = {
  MyFlow: undefined;
  TabTwo: undefined;
};

export type MainTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<StackNavigatorParamList, "Tabs">
  >;

export type StackNavigatorParamList = {
  Root: undefined;
  Email: undefined;
  Password: { exists: FindUserQuery };
  // Tabs: CompositeScreenProps<RootTabScreenProps<RootTabParamList, "Root">>;
  Tabs: RootTabParamList;
};

export type EmailScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "Password"
>;

export type PasswordScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "Password"
>;

export interface APIResponse<DataType> {
  data: DataType;
  errors: Array<{
    message: string;
    path: string;
  }>;
}
