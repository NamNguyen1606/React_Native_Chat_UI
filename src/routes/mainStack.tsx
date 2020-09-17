import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatRoomScreen from '../screens/ChatRoom';
import RoomsScreen from '../screens/Rooms';
import Route from '../utils/route';

interface Props {}

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.Rooms}
        component={RoomsScreen}
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
