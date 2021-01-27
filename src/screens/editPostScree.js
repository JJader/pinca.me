import React from 'react'
import { View, Text } from 'react-native'

export default function editPostScree({navigation,route}) {
  const { title, start, end, description, type, category, id, interested, creator } = route.params;
  
  const { user } = route.params;

  return (
    <View>
      <Text>{route.params.title}</Text>
    </View>
  )
}
