import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import UserBar from '../button/userBar'

import { getUserData } from '../../api/user';
import { lightGrey } from '../../styles/color'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { auth } from '../../config/firebase'

export default function card({
  item = {},
  onPostPress = () => { },
  onUserPress = () => { },
}) {
  const [userData, setUserData] = useState({ name: '' })

  useEffect(() => {
    getUserData(item.userId).then((snapshot) => {
      const data = snapshot.data();
      setUserData(data);
    })
  }, [item.id])

  return (
    <View style={styles.container}>

      <TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text} numberOfLines={3} >
          {item.descrition}
        </Text>
      </TouchableOpacity>

      <UserBar
        name={userData.name}
        image={require('../../assets/defaultPic.jpg')}
        onPress={() => onUserPress(userData)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    marginVertical: 10,
    height: 130,
    justifyContent: 'space-between',
    padding: 10,
    elevation: 2,

    borderWidth:0.1,

    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },    
  },

  title: {
    fontWeight: 'bold'
  },

  text: {
    color: lightGrey
  }
})

