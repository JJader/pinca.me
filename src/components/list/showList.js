import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'

export default function displayItems({
  items, style, itemStyle
}) {

  return (
    <View style={style}>
      <FlatList
        horizontal={true}
        data={items}
        renderItem={({ item }) => (
          <View style={[styles.card, itemStyle]}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C4C4C4",
    marginLeft: 8,
    alignSelf: "center",
    padding: 7,
    borderRadius: 5,
  },
})
