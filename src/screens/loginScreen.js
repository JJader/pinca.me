import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { signIn } from "../api/login";

export default function loginScree({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function trySignIn() {
    signIn({ email, password }).then();
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <AntDesign
        name="back"
        size={24}
        color="#808080"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.text}>Log in</Text>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => trySignIn()}>
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            LOG IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    marginLeft: 20,
    marginTop: 32,
    fontSize: 50,
  },
  inputForm: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#FFF",
    borderColor: "black",
    borderWidth: 2,
    minHeight: 50,
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#E0174A",
    height: 52,
    width: "90%",
    borderRadius: 8,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 15,
    marginTop: 32,
  },
});
