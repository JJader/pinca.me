import React, { useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'

import {signIn} from '../api/login'

export default function loginScree({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function trySignIn() {
    signIn({email,password}).then()
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Login</Text>

      <View style={styles.viewInput}>
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
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={[{ backgroundColor: '#ff007f' }, styles.signIn]}
          onPress={( ) => trySignIn()}
        >
          <Text>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signIn}
          onPress={() => navigation.navigate('signUp')}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
  },

  viewInput: {
    flex: 2,
    width: '75%',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    padding: 10,
    maxHeight: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  viewButton: {
    flex: 1,
    width: '75%',
    alignItems: 'center',
  },

  signIn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
})
