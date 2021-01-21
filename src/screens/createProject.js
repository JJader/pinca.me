import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native'

import { createPostData } from '../api/posts'
import { pink, lightGrey } from '../styles/color'
import { defaultStyle } from '../styles/index'

import DatePicker from '../components/list/datePicker'
import LoadingButton from '../components/button/loadingButton'
import SelectList from '../components/list/selectList'
import PickerList from '../components/list/pickerList'

const items = [{
  id: '1',
  name: 'Engenharia de computação'
}, {
  id: '2',
  name: 'Engenharia de produção'
}, {
  id: '3',
  name: 'Engenharia elétrica'
}, {
  id: '4',
  name: 'Sistema de informação'
}
];

const now = new Date(Date.now())

export default function createPostScreen({ navigation: { navigate } }) {
  const [title, setTitle] = useState('')
  const [descrition, setDescrition] = useState('')
  const [start, setStart] = useState(now)
  const [end, setEnd] = useState(now)
  const [category, setCategory] = useState([])

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
      setTitle('')
      setDescrition('')
      setStart('')
      setEnd('')
      setCategory('')
      navigate('feed')
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView} >
      <StatusBar backgroundColor='black' />
      <View style={defaultStyle.container}>
        <Text style={defaultStyle.title}>Create project</Text>

        <TextInput
          style={defaultStyle.input}
          placeholder='Título do Projeto'
          value={title}
          onChangeText={setTitle}
        />
        <PickerList
          data={items}
          text={'Tipo'}
        />

        <TextInput
          style={defaultStyle.inputHorizontal}
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

        <SelectList
          style={styles.selectList}
          text='Categorias'
          inputText='Procurar'
          data={items}
          onItemsChange={setCategory}
          buttonColor={pink}
        />

        <LoadingButton
          text={'CRIAR PROJETO'}
          styleButton={defaultStyle.button}
          styleText={{ color: 'white' }}
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
    backgroundColor: 'white'
  },

  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20
  },

  dateText: {
    color: lightGrey,
    marginBottom: 5
  },

  selectList: {
    flex: 1,
    height: '100%',
    marginBottom: 20,
  },
})
