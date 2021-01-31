import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";

import LoadingButton from '../components/button/loadingButton'
import BackIcon from '../components/icons/backIcon'

import { registration } from "../api/login";
import { defaultStyle } from "../styles";

export default function signUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function trySignUp() {
    const data = {
      name: name,
    };

    await registration(email, password, data)
  }

  return (
    <View style={defaultStyle.container}>
      <StatusBar backgroundColor='black' />

      <BackIcon
        onPress={() => navigation.goBack()}
      />

      <Text style={defaultStyle.title}>Registre-se</Text>

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

      <TextInput
        style={defaultStyle.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <LoadingButton
        onPress={() => trySignUp()}
        text={"PROXIMO"}
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
