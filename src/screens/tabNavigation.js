import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import {
  FeedScreen,
  SearchScreen,
  MakeProjectScreen,
  ProfileScree
} from './index'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName='create'
    >
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-home"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-search"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="create"
        component={MakeProjectScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-add"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScree}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-person"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}