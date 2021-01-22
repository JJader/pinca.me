import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ScrollView, StatusBar, StyleSheet } from 'react-native'

import BigCard from '../components/card/bigPostCard'

import { getFeedPosts } from '../api/posts'

import { pink, lightGrey } from '../styles/color'
import { defaultStyle } from '../styles/index'


export default function feedScreen() {

  const [universityPosts, setUniversityPosts] = useState([])
  const [personalPost, setPersonalPosts] = useState([])

  useEffect(() => {
    getFeedPosts('xvxGHnARivZI8urHME2uC3PmcIr2').then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setUniversityPosts(posts);
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}>
      <StatusBar backgroundColor='black' />
      <View style={[defaultStyle.container]}>
        <Text style={defaultStyle.title}>Explorar</Text>

        <Text style={styles.text}>PROJETOS EM DESTAQUE</Text>

        <FlatList
          data={universityPosts}
          key={({ item }) => item.id}
          renderItem={({ item }) => (

            <BigCard
              item={item}
              onUserPress={(user) => (alert(user.name))}
              onPostPress={(post) => (alert(post.title))}
            />
          )}
          horizontal={true}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    marginBottom: 20
  }
})
