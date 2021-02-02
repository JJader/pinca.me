import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getUserData } from '../api/user'
import { database, auth } from '../config/firebase'
import UserBar from "../components/button/userBar";
import { ScrollView } from 'react-native-gesture-handler'
import { defaultStyle } from '../styles'
import { lightGrey, pink } from '../styles/color'



export default function chatScreenList({ navigation }) {

  const [chats, setChats] = useState([])
  const userRef = auth.currentUser.uid

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = database
        .collection('users')
        .doc(userRef)
        .onSnapshot((user) => {
          const ids = user.data().chats

          creatObj(ids).then()
        })

      return () => { unsubscribe() }
    }, [userRef]
    )
  )

  async function creatObj(ids) {
    let newChat = [];
    for (let index = 0; index < ids.length; index++) {
      const user = await getNames(ids[index]);
      const id = ids[index];
      const obj = { user, id };
      newChat.push(obj);
    }

    setChats(newChat)
  }

  async function getNames(chats) {
    const users = chats.split('_')
    const user0Data = await getUserData(users[0])
    const user1Data = await getUserData(users[1])

    if (user0Data.id == auth.currentUser.uid) {
      return (user1Data.data())
    } else {
      return (user0Data.data())
    }
  }

  return (

    <View style={defaultStyle.container}>
      <Text style={defaultStyle.title}>Chat</Text>

      < FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <UserBar
              size={'medium'}
              name={item.user.name}
              image={item.user.picture}
              styleText={{ fontSize: 18 }}
              style={styles.userBar}
              onPress={() => { navigation.navigate('chat', { chatId: item.id }) }}
            />
          )
        }}
        key={({ item }) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  userBar: {
    padding:5,
    marginBottom:10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderBottomColor: lightGrey
  }
})