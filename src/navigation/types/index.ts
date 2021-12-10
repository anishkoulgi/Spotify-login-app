import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  GetStartedScreen: undefined;
  DashboardScreen: undefined;
};

export type RootNavRouteProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RootNavProp<
  T extends keyof RootStackParamList = any
> = NativeStackNavigationProp<RootStackParamList, T>;
