// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button, FlatList, text }
  from 'react-native'

import { getUserData } from '../api/user'
import { database, auth } from '../config/firebase'

LogBox.ignoreAllLogs(true)

export default function chatScreen({ navigation, route }) {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])



  const chatsRef = database.collection('chats').doc('123').collection(creatChatId())

  useEffect(() => {
    creatChatId()
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data()
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  function creatChatId() {
    const userID = auth.currentUser.uid
    const destinataryId = route.params ? route.params.destinataryId : auth.currentUser.uid;
    const chatIDpre = [];
    chatIDpre.push(userID);
    chatIDpre.push(destinataryId);
    chatIDpre.sort();
    return chatIDpre.join('_')
  }

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

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


  return < GiftedChat messages={messages} user={user} onSend={handleSend} />
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
