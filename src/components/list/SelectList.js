import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MultiSelect from 'react-native-multiple-select';

export default function SelectList({
  data = [],
  text = 'Click  here',
  inputText = 'Search',
  buttonColor = '#CCC',
  buttonText = 'Submit',
  onItemsChange,
  style
}) {

  const [selectedItems, setSelectedItems] = useState([])
  const [multiSelect, SetMultiSelect] = useState(null)

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    onItemsChange(selectedItems);
  };
  return (
    <View style={[{ flex: 1 }, style]}>
      <MultiSelect
        flatListProps={{ horizontal: true }}
        styleInputGroup={{
          height: 60,
          padding: 10,
        }}
        styleItemsContainer={{
          marginVertical: 20,
        }}
        hideTags
        items={data}
        uniqueKey="id"
        ref={(component) => { SetMultiSelect(component) }}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText={text}
        searchInputPlaceholderText={inputText}
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor={buttonColor}
        submitButtonText={buttonText}
      />
      <View>
        {
          multiSelect && multiSelect.getSelectedItemsExt(selectedItems)
        }
      </View>
    </View>
  )
}

export function displayItems({
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
