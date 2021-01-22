import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function userBar({
  name,
  image,
  style,
  styleText,
  onPress = () => { }
}) {
  return (
    <View style={[styles.viewUser, style]}>
      <TouchableOpacity
        onPress={() =>( onPress())}
      >
        <Image
          source={image}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={[styles.userName, styleText]}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewUser: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  image: {
    width: 40,
    height: '100%',
    borderRadius: 40,
  },

  userName: {
    fontWeight: 'bold',
    marginLeft: 10,
  }
})

