import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons';
import { defaultStyle } from '../../styles/index'

const sizeIcon = 35;

export default function pickerList({
  onValueChange = () => { },
  data = [],
  text = 'Clique aqui',
  displayKey = 'name',
  uniqueKey = 'id',
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
    <View style={styles.view}>
      <Ionicons
        name="ios-arrow-forward"
        size={24}
        color="black"
      />

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
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: "5%",
    minHeight: sizeIcon,
  },

  pickerStyle: {
    flex: 1,
    color: 'black',
    justifyContent: 'center',
  },

  itemStyle: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 10,
  }
})

