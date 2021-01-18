import React from 'react';
import { LogBox } from 'react-native';
import StackNavigation from './src/screens/stackNavigation'
import {auth} from './src/config/firebase'
LogBox.ignoreLogs(['Setting a timer for a long']);

export default function App() {
  return (
    <StackNavigation />
  );
}