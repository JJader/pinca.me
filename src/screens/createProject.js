import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView
} from 'react-native'

import { createPostData } from '../api/posts'
import { pink, lightGrey } from '../styles/color'
import DatePicker from '../components/calender/datePicker'
import LoadingButton from '../components/button/loadingButton'

export default function createPostScreen({ navigation: { navigate } }) {
  const [title, setTitle] = useState('')
  const [descrition, setDescrition] = useState('')
  const [start, setStart] = useState(Date.now())
  const [end, setEnd] = useState(Date.now())
  const [category, setCategory] = useState('')

  async function createPost() {
    const data = {
      title,
      descrition,
      start,
      end,
      category,
    }

    let snapshot = await createPostData(data)

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
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor='black' />
      <View style={styles.contatiner}>
        <Text style={styles.title}>Create project</Text>

        <TextInput
          style={styles.inputVertical}
          placeholder='Título do Projeto'
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputHorizontal}
          placeholder='Descrição'
          value={descrition}
          onChangeText={setDescrition}
          dataDetectorTypes='calendarEvent'
          multiline={true}
        />

        <View style={styles.dataView}>
          <DatePicker
            onChange={setStart}
            text='Data de início'
            styleText={styles.dateText}
          />
          <DatePicker
            onChange={setEnd}
            text='Data de conclusão'
            styleText={styles.dateText}
          />
        </View>

        <TextInput
          style={styles.inputHorizontal}
          placeholder='Categorias'
          value={category}
          onChangeText={setCategory}
          multiline={true}
        />

        <LoadingButton
          text={'CRIAR PROJETO'}
          styleButton={styles.button}
          styleText={styles.text}
          onPress={() => createPost().then()}
        />
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
    height: 50,
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

  dateText: {
    color: lightGrey,
    marginBottom: 5
  },

  button: {
    backgroundColor: pink,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    minHeight: 60
  },

  text: {
    color: 'white',
  }
})
