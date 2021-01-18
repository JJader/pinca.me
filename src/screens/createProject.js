import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ScrollView
} from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { createPostData } from '../api/posts'
import { auth } from '../config/firebase'

export default function createPostScreen({ navigation: { navigate } }) {

  const [title, setTitle] = useState('')
  const [descrition, setDescrition] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [category, setCategory] = useState('')

  function createPost() {
    const data = {
      title,
      descrition,
      start,
      end,
      category,
    }
    createPostData(data).then((snapshot) => {
      if (snapshot.error) {
        alert(snapshot.error.message)
      }
      else {
        navigate('feed')
        setTitle('')
        setDescrition('')
        setStart('')
        setEnd('')
        setCategory('')
      }
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor='black' />
      <View style={styles.contatiner}>
        <Text style={styles.title}>Create project</Text>

        <TextInput
          style={styles.inputVertical}
          placeholder='Title'
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputHorizontal}
          placeholder='Descrition'
          value={descrition}
          onChangeText={setDescrition}
          dataDetectorTypes='calendarEvent'
          multiline={true}
        />
        <View style={styles.dataView}>
          <TextInput
            style={styles.dateInput}
            placeholder='Start date'
            value={start}
            onChangeText={setStart}
            dataDetectorTypes='calendarEvent'
          />

          <TextInput
            style={styles.dateInput}
            placeholder='End date'
            value={end}
            onChangeText={setEnd}
          />
        </View>

        <TextInput
          style={styles.inputHorizontal}
          placeholder='Category'
          value={category}
          onChangeText={setCategory}
          multiline={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => createPost()}
        >
          <AntDesign name="pluscircle" size={60} color="#ff007f" />
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    width: '100%',
  },

  contatiner: {
    flex: 1,
    width: '90%'
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 30
  },

  inputVertical: {
    padding: 10,
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  inputHorizontal: {
    padding: 10,
    height: 140,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  dateInput: {
    flex: 1
  },

  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
