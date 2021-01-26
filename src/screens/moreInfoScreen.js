import React from 'react'
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

import ShowList from '../components/list/showList'
import { defaultStyle } from '../styles';
import { lightGrey, pink } from '../styles/color';

defaultStyle

export default function moreInfoScreen({ navigation, route }) {

  const { title, start, end, description, type, category } = route.params;
  const { user } = route.params;

  const startText = new Date(Date(start));
  const endText = new Date(Date(end));

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
        </ImageBackground>
      </View>

      <View style={styles.textView}>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>{type}</Text>

        <UserBar
          name={user.name}
        />

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
      <LoadingButton
        text={'Estou interessado'}
        styleButton={styles.button}
      />

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
    justifyContent: 'flex-end'
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

