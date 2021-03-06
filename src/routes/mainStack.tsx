import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import Route from '../utils/route';
import CreateBottomTab from './bottomTabBar';
import {
  RegisterScreen,
  LoginScreen,
  ChatRoomScreen,
  AddingUserGroupScreen,
  CreatingGroupScreen,
  SearchingScreen,
} from '../screens';

interface Props {}

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.LoginScreen}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={Route.CreatingGroup}
        component={CreatingGroupScreen}
        options={{headerShown: true, title: 'Create group'}}
      />
      <Stack.Screen
        name={Route.AddingGroup}
        component={AddingUserGroupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.RegisterScreen}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.HomeScreen}
        component={CreateBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.ChatScreen}
        component={ChatRoomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.SearchingScreen}
        component={SearchingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
