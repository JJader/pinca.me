import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {CheckBox} from 'react-native-elements'
import {pink} from '../../styles/color'

export default function checkbox({
  text,
  style,
  styleText,
  boxColor=pink,
  onValueChange = () => { }
}) {

  const [value, setvalue] = useState(false)

  const valueChange = () => {
    const newValue = !value
    setvalue(newValue)
    onValueChange(newValue)
  }

  return (
    <View style={[style,styles.container]}>
      <CheckBox
        size={25}
        checkedColor={pink}
        uncheckedColor={pink}
        checked={value}
        onPress={valueChange}
        containerStyle={{padding:0}}
      />
      <Text style={styleText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding:0,
  }
})
