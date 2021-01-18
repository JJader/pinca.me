import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignUpScreen } from './index'
import TabNavigation from './tabNavigation'
import { auth } from '../config/firebase';

const Stack = createStackNavigator();

function App() {

  const [isUserCurrent, setIsUserCurrent] = useState(false)

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserCurrent(true)
    }
    else {
      setIsUserCurrent(false)
    }
  })

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='login'
      >
        {
          !isUserCurrent ?
            (<>
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }} />
              <Stack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{
                  title: null,
                  headerStyle: {
                    backgroundColor: null,
                    elevation: 0,
                  }
                }} />
            </>)
            :
            (
              < Stack.Screen
                name="tabNavigation"
                component={TabNavigation}
                options={{
                  headerShown: false
                }}
              />
            )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;