import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import BackIcon from '../components/icons/backIcon'

import LoadingButton from '../components/button/loadingButton'
import { signIn } from "../api/login";
import { defaultStyle } from "../styles";


export default function loginScree({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function trySignIn() {
    await signIn({ email, password })
  }

  return (
    <View style={defaultStyle.container}>
      <StatusBar backgroundColor='black' />

      <BackIcon
        onPress={() => navigation.goBack()}
      />

      <Text style={defaultStyle.title}>Log in</Text>

      <TextInput
        style={defaultStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={defaultStyle.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <LoadingButton
        text={'LOG IN'}
        onPress={() => trySignIn()}
        styleButton={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    ...defaultStyle.button,
    maxHeight: 60,
    minHeight: 60,
  },

});
