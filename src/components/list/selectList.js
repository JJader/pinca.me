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
  style,
  displayKey = 'name',
  uniqueKey = 'id',
}) {

  const [selectedItems, setSelectedItems] = useState([])
  const [multiSelect, SetMultiSelect] = useState(null)

  const onSelectedItemsChange = (selectedItems) => {
    if (!lastIdReapeat(selectedItems)) {
      setSelectedItems(selectedItems);
      onItemsChange(selectedItems);
    }
  };

  function lastIdReapeat(items = []) {
    if (items.length == 0) {
      return false
    }

    const lastIndex = items.length - 1;
    const id = items[lastIndex];

    const index = items.findIndex((element) => (
      element == id
    ))

    return lastIndex != index;
  }

  function addNewItens(items) {
    const item = items[items.length - 1]
    if (!lastElementRepeats(items)) {
      data.push(item)
    }
  }

  function lastElementRepeats(items = []) {
    if (items.length == 0) {
      return false
    }

    const lastIndex = items.length - 1;
    const item = items[lastIndex];
    const key = item[uniqueKey];
    const value = item[displayKey];

    const index = items.findIndex((element) => (
      element[uniqueKey] == key ||
      element[displayKey] == value
    ))

    return lastIndex != index;;
  }

  const clearSelected = () => {
    multiSelect._removeAllItems();
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
        hideDropdown={true}
        items={data}
        uniqueKey={uniqueKey}
        ref={(component) => { SetMultiSelect(component) }}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText={text}
        searchInputPlaceholderText={inputText}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey={displayKey}
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor={buttonColor}
        submitButtonText={buttonText}
        canAddItems={true}
        onAddItem={(item) => (addNewItens(item))}
      />
      <View>
        {
          multiSelect && multiSelect.getSelectedItemsExt(selectedItems)
        }
      </View>
    </View>
  )
}