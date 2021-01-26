import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import LoadingButton from '../button/button'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pink } from '../../styles/color';
import { PROJECT_TYPE } from '../../redux/constants/index'


export default function filterModal({
  textStyle = styles.textFilter,
  viewStyle = styles.viewFilter,
  text = 'FILTRAR',
  onFilter = () => { },
  onNoFilter = () => { }
}) {

  const [isVisible, setIsVisible] = useState(false)

  function selectItem(parametro, operador, valor, texto) {
    setIsVisible(!isVisible)
    onFilter(parametro, operador, valor, texto)
  }

  function onPressIcon() {
    setIsVisible(!isVisible)
    onNoFilter()
  }

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

            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color={pink}
              style={{ alignSelf: 'flex-end' }}
              onPress={() => (onPressIcon())}
            />

            <Text style={styles.title}>
              Clique na opção do seu interesse
            </Text>

            <LoadingButton
              text={'Projetos com bolsa'}
              onPress={() => {
                selectItem(
                  'isPaid',
                  '==',
                  true,
                  'Projetos com bolsa'
                )
              }}
              styleButton={styles.options}
              styleText={{ color: 'black' }}
            />

            {
              PROJECT_TYPE.map((type) => (
                <LoadingButton
                  key={type.id}
                  text={type.name}
                  onPress={() => {
                    selectItem(
                      'type',
                      '==',
                      type.id,
                      type.name
                    )
                  }}
                  styleButton={styles.options}
                  styleText={{ color: 'black' }}
                />
              ))
            }
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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    borderColor: pink,
    borderStartWidth: 5,
    borderEndWidth: 5,
    elevation: 10
  },

  viewFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  textFilter: {
    alignSelf: 'center',
    fontWeight: "bold",
    color: pink,
  },

  title: {
    alignSelf: 'center',
    fontWeight: "bold",
    color: pink,
    fontSize: 18,
    textAlign: 'center'
  },

  options: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 0.5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: pink,
    borderRadius: 20,
    marginVertical: 10
  }

})
