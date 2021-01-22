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
import Checkbox from '../components/button/checkbox'

import { PROJECT_TYPE } from '../redux/constants/index'

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
  const [description, setDescription] = useState('')
  const [start, setStart] = useState(now)
  const [end, setEnd] = useState(now)
  const [category, setCategory] = useState([])
  const [isPaid, setIsPaid] = useState(false)

  async function createPost() {
    const data = {
      title,
      description,
      start,
      end,
      category,
      isPaid,
    }
    
    let snapshot = await createPostData(data)

    if (snapshot.error) {
      alert(snapshot.error.message)
    }
    else {
      setTitle('')
      setDescription('')
      setStart('')
      setEnd('')
      setCategory('')
      navigate('feed')
    }
  };

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView} >
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
          data={PROJECT_TYPE}
          text={'Tipo'}
          style={defaultStyle.input}
          iconColor={pink}
          icon='ios-school'
        />

        <TextInput
          style={defaultStyle.inputHorizontal}
          placeholder='Descrição'
          value={description}
          onChangeText={setDescription}
          dataDetectorTypes='calendarEvent'
          multiline={true}
        />

        <Checkbox
          style={defaultStyle.input}
          text={'Possui bolsa'}
          onValueChange={setIsPaid}
        />

        <View style={styles.dateView}>
          <DatePicker
            onChange={setStart}
            text='Data de início'
            styleText={styles.dateText}
            styleContainer={styles.date}
          />
          <DatePicker
            onChange={setEnd}
            text='Data de conclusão'
            styleText={styles.dateText}
            styleContainer={styles.date}
          />
        </View>

        <SelectList
          style={[defaultStyle.input, styles.selectList]}
          text='Categorias'
          inputText='Procurar'
          buttonText='Ok'
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
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    ...defaultStyle.input,
    justifyContent: 'center',
    margin: 5,
  },

  selectList: {
    flex: 1,
    height: '100%',
    marginBottom: 20,
  },
})
