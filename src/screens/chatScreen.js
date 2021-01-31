// @refresh reset

import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'

import Close from '../components/icons/closeIcon'

import AsyncStorage from '@react-native-community/async-storage'
import { addChatToUser, getUserData } from '../api/user'
import { database, auth } from '../config/firebase'

import { StyleSheet } from 'react-native'


var chatsRef;
var chatId;

export default function chatScreen({ navigation, route }) {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])

  useFocusEffect(
    useCallback(() => {

      if (route.params && route.params.chatId) {
        chatId = route.params.chatId
      } else {
        chatId = creatChatId()
      }

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

            if (querySnapshot.docs.length == 1) {
              addChatToUser(chatId).then()
            }

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
        navigation.setParams({ destinataryId: null, chatId: null })
        unsubscribe()
      }
    }, [route.params && route.params.destinataryId, route.params && route.params.chatId])
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

    if (user && user.id == auth.currentUser.uid) {
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
    <>
      <Close
        onPress={() => { navigation.goBack() }}
      />
      < GiftedChat
        messages={messages}
        user={user}
        onSend={handleSend}
      />
    </>
  )
}
