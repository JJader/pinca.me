import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'
import {pink} from '../../styles/color'

export default function checkbox({
  text,
  style,
  styleText,
  boxColor=pink,
  onValueChange = () => { }
}) {

  const [value, setvalue] = useState(false)

  const valueChange = (value) => {
    setvalue(value)
    onValueChange(value)
  }

  return (
    <View style={[styles.container, style]}>
      <Checkbox
        shouldRasterizeIOS={true}
        color={boxColor}
        style={{ marginRight: 8 }}
        value={value}
        onValueChange={valueChange}
      />
      <Text style={styleText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
