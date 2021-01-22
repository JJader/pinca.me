import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FirstScreen, LoginScreen, SignUpScreen, EditScreen } from "./index";
import TabNavigation from "./tabNavigation";
import { auth } from "../config/firebase";

const Stack = createStackNavigator();

function App() {
  const [isUserCurrent, setIsUserCurrent] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserCurrent(true);
    } else {
      setIsUserCurrent(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="start">
        {!isUserCurrent ? (
          <>
            <Stack.Screen
              name="start"
              component={FirstScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signUp"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="tabNavigation"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="edit"
              component={EditScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
