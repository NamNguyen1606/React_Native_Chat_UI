import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ContactScreen, RoomsScreen, SettingScreen} from '../screens';
import React from 'react';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

const CreateBottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        iconStyle: {color: 'red'},
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Room"
        component={RoomsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="chat"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="account-box"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="cog"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default CreateBottomTab;
