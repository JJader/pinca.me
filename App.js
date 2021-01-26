import React from "react";
import { LogBox } from "react-native";
import { auth } from "./src/config/firebase";
import StackNavigation from "./src/screens/stackNavigation";

LogBox.ignoreLogs(["Setting a timer for a long"]);
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

//auth.signOut()

export default function App() {
  return <StackNavigation />;
}
