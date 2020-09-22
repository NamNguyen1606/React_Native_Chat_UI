import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Route from '../utils/route';
import CreateBottomTab from './bottomTabBar';
import {RegisterScreen, LoginScreen, ChatRoomScreen} from '../screens';

interface Props {}

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={Route.LoginScreen}>
      {/* <Stack.Screen
        name={Route.RegisterScreen}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      /> */}
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
    </Stack.Navigator>
  );
};

export default MainStack;
