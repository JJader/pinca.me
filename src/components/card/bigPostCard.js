import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'

import UserBar from '../button/userBar'

import { getUserData } from '../../api/user';
import { lightGrey } from '../../styles/color'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function bigCard({
  item = {},
  onPostPress = () => { },
  onUserPress = () => { },
}) {

  const [userData, setUserData] = useState({ name: '' })

  useEffect(() => {
    getUserData(item.creator).then((snapshot) => {
      const data = snapshot.data();
      setUserData(data);
    })
  }, [item.id])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 2 }}
        onPress={() => (onPostPress(item))}
      >
        <Image
          source={require('../../assets/logo.png')}
          resizeMode={'cover'}
          style={styles.imagenView}
        />

        <View style={styles.viewText}>
          <Text style={styles.title}>{item.title}</Text>

          <Text
            style={styles.text}
            numberOfLines={5}
          >
            {item.descrition}
          </Text>
        </View>
      </TouchableOpacity>

      <UserBar
        name={userData.name}
        image={require('../../assets/defaultPic.jpg')}
        style={{ flex: 1 / 4 }}
        onPress={() => onUserPress(userData)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth * 0.9,
    marginHorizontal: 20,
    height: windowHeight * 0.45,
  },

  viewText: {
    flex: 1,
  },

  title: {
    fontWeight: 'bold',
    marginVertical: 15,
  },

  text: {
    flex: 1,
    color: lightGrey,
  },

  imagenView: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
