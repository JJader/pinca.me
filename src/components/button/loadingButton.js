import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'

export default function loadingButton({
  onPress, text, styleText, styleButton
}) {

  const [loading, setLoading] = useState(false)
  function IsNotLoding() {
    return (
      <TouchableOpacity style={styles.button}
        onPress={() => pressButton().then()}
      >
        <Text style={styleText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  async function pressButton() {
    setLoading(true)
    await onPress()
    setLoading(false)
  }

  function isLoding() {
    return (
      <ActivityIndicator
        style={styles.button}
        size="large"
        color="white"
        animating={true}
      />
    )
  }
  return (
    <View style={styleButton}>
      {loading ?
        (
          isLoding()
        ) :
        (
          IsNotLoding()
        )
      }
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
