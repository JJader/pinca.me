import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { registration } from "../api/login";
import { AntDesign } from "@expo/vector-icons";

export default function signUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");

  function trySignUp() {
    const data = {
      name: nickname,
    };

    registration(email, password, data).then();
  }

  return (
    <View style={styles.containter}>
      <AntDesign
        name="back"
        size={24}
        color="#808080"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.text}>Registre-se</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nickname}
          onChangeText={setNickName}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            trySignUp();
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            PRÓXIMO
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
