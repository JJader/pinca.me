import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Checkbox from '../button/checkbox'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../styles/color';

export default function filterModal({
  textStyle = styles.textFilter,
  viewStyle = styles.viewFilter,
  text = 'FILTRAR',

}) {

  const [isVisible, setIsVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity style={viewStyle}
        onPress={() => (setIsVisible(!isVisible))}
      >
        <Text style={textStyle}>{text}</Text>
        <MaterialCommunityIcons
          name="filter-variant"
          size={30}
          color={pink}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >

        <View style={styles.modalBackground} >
          <View style={styles.container}>
            <Checkbox
              text={'Apenas com bolsa'}
            />
            <Checkbox
              text={'Iniciação científica'}
            />
            <Checkbox
              text={'Extensão'}
            />
            <Checkbox
              text={'Empresa junior'}
            />
            <Checkbox
              text={'Núcleo'}
            />
            <Checkbox
              text={'Projeto pessoal'}
            />
            <Checkbox
              text={'Outros'}
            />
            <TouchableOpacity style={viewStyle}
              onPress={() => (setIsVisible(!isVisible))}
            >
              <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  container: {
    alignContent: 'center',
    alignSelf: 'center',
    height: '80%',
    width: '80%',
    margin: 40,
    backgroundColor: 'white'
  },

  viewFilter: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  textFilter: {
    alignSelf: 'center',
    fontWeight: "bold",
    color: pink,
  }
})
