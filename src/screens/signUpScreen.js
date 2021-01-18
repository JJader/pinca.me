import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native'

import { registration } from '../api/login'

export default function signUpScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function trySignUp() {
    const data = {
      name: name
    }

    registration(email, password, data).then()
  }

  return (

    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor='black' />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder='E-mail'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder='Nome'
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => trySignUp()}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 30
  },

  input: {
    padding: 10,
    width: '75%',
    height: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  button: {
    width: '75%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff007f',
    height: 75,
  },
})
