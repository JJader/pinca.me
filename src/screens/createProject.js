import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native'

import { createPostData, updatePost } from '../api/posts'
import { pink, lightGrey } from '../styles/color'
import { defaultStyle } from '../styles/index'

import UserList from '../components/list/userList'
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

const now = new Date(Date.now());
const CREATE_TITLE = 'CRIAR PROJETO';
const EDITE_TITLE = 'EDITAR PROJETO'

export default function createPostScreen({
  navigation: { navigate, setParams },
  route
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [start, setStart] = useState(now)
  const [end, setEnd] = useState(now)
  const [category, setCategory] = useState([])
  const [isPaid, setIsPaid] = useState(false)
  const [type, setType] = useState(false)
  const [collaborators, setCollaborators] = useState([])
  const [interested, setInterested] = useState([])
  const [screenName, setScreenName] = useState(CREATE_TITLE)

  useFocusEffect(
    useCallback(() => {
      if (route.params && route.params.post) {
        const post = route.params.post;
        setScreenName(EDITE_TITLE)
        setTitle(post.title)
        setDescription(post.description)
        setStart(post.start)
        setEnd(post.end)
        setCategory(post.category)
        setIsPaid(post.isPaid)
        setType(post.type)
        setInterested(post.interested)
        setCollaborators(post.collaborators)

      }

      return () => {
        setParams({ post: null })
        restoreScreen()
      }
    }, [route.params && route.params.post])
  )

  function onPressButton() {
    if (screenName == CREATE_TITLE) {
      createPost().then()
    }
    else if (screenName == EDITE_TITLE) {
      editePost()
    }
  }

  async function createPost() {
    const data = returnData();

    await createPostData(data).then(() => {
      restoreScreen()
      navigate('feed')
    })
  };

  function editePost() {
    const { id } = route.params.post
    const data = returnData()

    updatePost(id, { collaborators, ...data })
      .then(() => {
        restoreScreen()
        navigate('feed')
      })
  }

  function returnData() {
    return {
      title,
      description,
      start,
      end,
      category,
      isPaid,
      type,
    }
  }

  function restoreScreen() {
    setTitle('')
    setDescription('')
    setStart(now)
    setEnd(now)
    setCategory([])
    setIsPaid(false)
    setType(false)
    setInterested([])
    setCollaborators([])
    setScreenName(CREATE_TITLE)
  }

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView} >
      <StatusBar backgroundColor='black' />
      <View style={defaultStyle.container}>
        <Text style={defaultStyle.title}>{screenName}</Text>

        <TextInput
          style={defaultStyle.input}
          placeholder='Título do Projeto'
          value={title}
          onChangeText={setTitle}
        />

        <PickerList
          data={PROJECT_TYPE}
          initialItem={type}
          text={'Tipo'}
          style={defaultStyle.input}
          iconColor={pink}
          icon='ios-school'
          onValueChange={setType}
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
            text='Início da seleção'
            styleText={styles.dateText}
            styleContainer={styles.date}
          />
          <DatePicker
            onChange={setEnd}
            text='Fim da seleção'
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
          dataSelected={category}
          onItemsChange={setCategory}
          buttonColor={pink}
          canAddItems={true}
        />
        {
          screenName != EDITE_TITLE ? null :
            <UserList
              style={[defaultStyle.input, styles.selectList]}
              text='Participantes'
              inputText='Procurar'
              buttonText='Ok'
              data={interested}
              dataSelected={collaborators}
              onItemsChange={setCollaborators}
              buttonColor={pink}
              canAddItems={false}
            />
        }
        <LoadingButton
          text={screenName}
          styleButton={defaultStyle.button}
          styleText={{ color: 'white' }}
          onPress={() => onPressButton()}
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
