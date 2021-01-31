import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../styles/color';
import { StyleSheet } from 'react-native';

export default function Close({
  onPress = () => { },
  size = 35,
  color = pink,
  style = styles.icon,
}) {
  return (
    <MaterialCommunityIcons
      name="close-circle"
      size={size}
      color={color}
      style={style}
      onPress={() => (onPress())}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    margin: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
})

