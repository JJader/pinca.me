import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import {
  FeedScreen,
  SearchScreen,
  MakeProjectScreen,
  ProfileScreen,
  ChatScreen,
  ChatScreenList,
  MoreInfoScreen,
  EditPostScreen
} from "./index";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="feed"
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="create"
        component={MakeProjectScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="chatList"
        component={ChatScreenList}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          title: () => null,
          tabBarVisible: false,
          tabBarButton: () => false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="moreinfo"
        component={MoreInfoScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          title: () => null,
        }}
      />
      <Tab.Screen
        name="editpost"
        component={EditPostScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          title: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
