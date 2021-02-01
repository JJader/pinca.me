import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MultiSelect from 'react-native-multiple-select'
import { getUserData } from '../../api/user'

import { defaultStyle } from '../../styles'
import { pink } from '../../styles/color'

import SelectList from './selectList'

export default function userList({
  onItemsChange = () => { },
  data = [],
  dataSelected = [],
  text = 'Click  here',
  inputText = 'Search',
  buttonColor = '#CCC',
  buttonText = 'Submit',
  style,
  displayKey = 'name',
  uniqueKey = 'id',
}) {

  const [users, setUsers] = useState([])
  const [isReady, setIsReady] = useState(false)

  const [selectedItems, setSelectedItems] = useState(dataSelected)
  const [multiSelect, SetMultiSelect] = useState(null)

  useEffect(() => {
    formatInterestedList().then(() => {
      setIsReady(true)
    })
  }, [data.length])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    onItemsChange(selectedItems);
  }

  async function formatInterestedList() {
    let users = []
    const ids = data.concat(dataSelected)

    for (let i = 0; i < ids.length; i++) {
      const user = await getUserData(ids[i])

      if (!user.error && user.data()) {
        let item = {}
        item[uniqueKey] = ids[i]
        item[displayKey] = user.data().name

        const find = users.find((user) => user[uniqueKey] == item[uniqueKey])
        if (!find) {
          users.push(item)
        }
      }
    }
    setUsers(users)
  }

  return (
    !isReady ? null :
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
          items={users}
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
        />
        <View>
          {
            multiSelect && multiSelect.getSelectedItemsExt(selectedItems)
          }
        </View>
      </View>
  )
}
