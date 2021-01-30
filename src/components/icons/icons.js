import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../styles/color';

export function Close(onPress, style) {
  return (
    <MaterialCommunityIcons
      name="close-circle"
      size={30}
      color={pink}
      style={style}
      onPress={() => (onPress())}
    />
  )
}
