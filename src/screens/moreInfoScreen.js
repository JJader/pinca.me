import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native'

import LoadingButton from '../components/button/button';
import UserBar from '../components/button/userBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ShowList from '../components/list/showList'
import { defaultStyle } from '../styles';
import { lightGrey, pink } from '../styles/color';

import { auth } from '../config/firebase';
import { addInterestedUser, removeInterestedUser } from '../api/posts'

export default function moreInfoScreen({ navigation, route }) {

  const { title, start, end, description, type, category, id, interested, creator } = route.params;
  const { user } = route.params;

  const startText = new Date(Date(start));
  const endText = new Date(Date(end));

  async function addInterested() {
    await addInterestedUser(auth.currentUser.uid, id)
    navigation.navigate('feed', { update: true })
  }

  async function removeInterested() {
    await removeInterestedUser(auth.currentUser.uid, id)
    navigation.navigate('feed', { update: true })
  }

  function closeMoreInfo() {
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[
      defaultStyle.scrollView, styles.scrollView
    ]}
    >

      <StatusBar backgroundColor='black' />

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://picsum.photos/seed/" + Math.random() + "/500/500",
          }}
          resizeMode={"cover"}
          style={styles.image}
        >

          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color={pink}
            style={{ alignSelf: 'flex-end', padding: 10 }}
            onPress={() => (closeMoreInfo())}
          />

        </ImageBackground>
      </View>

      <View style={styles.textView}>
        <UserBar
          name={user.name}
        />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>{type}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.text}>
          Inicio da seleção: {startText.toLocaleDateString()}
        </Text>

        <Text style={styles.text}>
          Fim da seleção: {endText.toLocaleDateString()}
        </Text>

        <Text style={styles.area}>
          Areas:
        </Text>

        <ShowList
          style={styles.list}
          items={category}
        />

      </View>
      {
        creator == auth.currentUser.uid ?
          (
            <LoadingButton
              text={'EDITAR'}
              styleButton={styles.button}
              onPress={() => navigation
                .navigate('create', { post:route.params })
              }
            />
          )
          :
          interested.includes(auth.currentUser.uid) ?
            (
              <LoadingButton
                text={'DESINSCREVER-SE'}
                styleButton={[styles.button, { backgroundColor: 'grey' }]}
                onPress={() => removeInterested().then()}
              />
            )
            :
            (
              <LoadingButton
                text={'INSCREVER-SE'}
                styleButton={styles.button}
                onPress={() => addInterested().then()}
              />
            )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignSelf: "center",
  },

  textView: {
    flex: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'white'
  },

  image: {
    flex: 1,
    width: '100%',
    height: '150%',
    alignSelf: 'center',
    //justifyContent: 'flex-end'
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  type: {
    marginVertical: 5,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: pink
  },

  description: {
    minHeight: 150,
    textAlignVertical: 'center',
    textAlign: 'justify',
    marginVertical: 20,
    color: lightGrey
  },

  area: {
    marginTop: 10,
    fontWeight: 'bold'
  },

  button: {
    ...defaultStyle.button,
    marginBottom: 20,
    flex: 0,
    width: '95%',
    alignSelf: 'center'
  },

  list: {
    flex: 1,
    alignSelf: 'center'
  },

})

