import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons';

const sizeIcon = 35;

export default function pickerList({
  onValueChange = () => { },
  data = [],
  text = 'Clique aqui',
  displayKey = 'name',
  uniqueKey = 'id',
  icon = null,
  iconColor = 'black',
  iconSize = 24,
  style
}) {
  const [selectedItem, setSelectedItem] = useState('')

  const updateSelectedItem = (item) => {
    if (item != '') {
      setSelectedItem(item)
      onValueChange(item)
    }
    else {
      setSelectedItem(text)
    }
  }

  return (
    <View style={[style, styles.view]}>
      {
        !icon ? null : (
          <Ionicons
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        )
      }

      <Picker
        selectedValue={selectedItem}
        style={styles.pickerStyle}
        onValueChange={(itemValue) =>
          updateSelectedItem(itemValue)
        }
      >

        <Picker.Item label={text} value="" />

        {
          data.map((item, index) => {
            return (
              <Picker.Item
                label={"   " + item[displayKey]}
                value={item[uniqueKey]}
                key={index}
              />
            )
          })
        }

      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({

  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60
  },

  pickerStyle: {
    flex: 1,
    color: 'black',
    justifyContent: 'center',
    height: '100%'
  },
})

