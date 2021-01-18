import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { getAllPosts } from '../api/posts'
import { getUserData } from '../api/user'
import { auth, database } from '../config/firebase'

export default function profileScreen({ user }) {
  const [posts, setPosts] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [userName, setUsername] = useState(false)

  useEffect(() => {
    let currentUser = auth.currentUser.uid

    if (user && user.id != currentUser) {
      setIsCurrentUser(false)
      getOtherPosts(user.id)
      getUser(user.id)
    }
    else {
      setIsCurrentUser(true)
      getCurrentPosts(currentUser)
      getUser(currentUser)
    }
  }, [])

  function getOtherPosts(id) {
    getAllPosts(id).then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      setPosts(posts)
      console.log(posts)
    })
  }

  function getCurrentPosts(id) {
    // Depois penso em uma forma mais eficiente de fazer isso
    database.collection('posts')
      .doc(id)
      .collection('userPosts')
      .orderBy("creation", 'asc')
      .onSnapshot((query) => {
        const list = [];

        query.forEach((doc) => {
          list.push(
            {
              ...doc.data(),
              id: doc.id,
            }
          );
        })
        setPosts(list);
      })
  }

  function getUser(id) {
    getUserData(id).then((snapshot) => {
      const name = snapshot.data().name
      setUsername(name)
    })
  }

  function card(item) {
    return (
      <View style={styles.card}>
        <Text>{item.title}</Text>
        <Text>{item.start}</Text>
        <Text>{item.end}</Text>
        <Text>{item.descrition}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>{userName}</Text>
      {
        isCurrentUser ?
          (
            <Text style={styles.title}>Editar</Text>
          )
          :
          (
            <Text style={styles.title}>Bater um papo</Text>
          )
      }
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          card(item)
        )}
        key={({ item }) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },

  card: {
    backgroundColor: 'grey',
    marginVertical: 20,
    alignSelf: 'center',
    padding: 20
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

