import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../styles/color';
import { StyleSheet } from 'react-native';

export default function containerIcon({
  onPress = () => { },
  name = "close-circle",
  size = 35,
  color = pink,
  style,
}) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={() => (onPress())}
    />
  )
}

const styles = StyleSheet.create({
  
})

