import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen, LoginScreen, SignUpScreen } from './index'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='login'
      >
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="tabNavigation"
          component={FeedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;