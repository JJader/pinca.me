import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function displayItems({
  items, displayKey = 'name', uniqueKey = 'id'
}) {

  return items.map(item => {

    if (!item[displayKey]) return null;
    return (
      <View
        style={[
          styles.selectedItem,
          { width: item[displayKey].length * 8 + 60 }
        ]}
        key={item[uniqueKey]}
      >
        <Text
          style={styles.textItem}
          numberOfLines={1}
        >
          {item[displayKey]}
        </Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  selectedItem: {
    justifyContent: 'center',
    height: 40,
    borderColor: '#00A5FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2,
  },

  textItem: {
    flex: 1,
    color: '#00A5FF',
    fontSize: 15,
  },
})
