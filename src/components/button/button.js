import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'

import { defaultStyle } from '../../styles'

export default function button({
  onPress = () => { },
  text = "CLIQUE AQUI",
  styleText = { color: 'white' },
  styleButton = defaultStyle.button
}) {

  const [loading, setLoading] = useState(false)

  return (
    <View style={styleButton}>
      <TouchableOpacity style={styles.button}
        onPress={() => (onPress())}
      >
        <Text style={styleText}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
