// @refresh reset

import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { getUserData } from '../api/user'
import { database, auth } from '../config/firebase'

import { StyleSheet } from 'react-native'

//LogBox.ignoreAllLogs(true)

var chatsRef;

export default function chatScreen({ navigation, route }) {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])

  useFocusEffect(
    useCallback(() => {
      const chatId = creatChatId()

      chatsRef = database
        .collection('chats')
        .doc('privateChat')
        .collection(chatId)

      readUser()

      const unsubscribe = chatsRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          (querySnapshot) => {
            const messagesFirestore = []

            querySnapshot.forEach((doc) => {
              const message = doc.data()
              const createdAt = message.createdAt.toDate()
              messagesFirestore.push({
                ...message,
                createdAt: createdAt,
              })
            })

            setMessages(messagesFirestore)
          })

      return () => {
        navigation.setParams({ destinataryId: null })
        unsubscribe()
      }
    }, [route.params && route.params.destinataryId])
  )

  function creatChatId() {
    const userID = auth.currentUser.uid
    const destinataryId =
      route.params ? route.params.destinataryId ? route.params.destinataryId : auth.currentUser.uid : auth.currentUser.uid;
    const chatIDpre = [];
    chatIDpre.push(userID);
    chatIDpre.push(destinataryId);
    chatIDpre.sort();
    return chatIDpre.join('_')
  }

  async function readUser() {
    const user = await AsyncStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    }
    else {
      const userData = await getUserData(auth.currentUser.uid);

      const user = {
        id: userData.id,
        name: userData.data().name
      }

      AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }
  }

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }


  return (
    < GiftedChat
      messages={messages}
      user={user}
      onSend={handleSend}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
})
