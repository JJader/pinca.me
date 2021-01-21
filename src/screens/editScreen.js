import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { registration } from "../api/login";
import { AntDesign } from "@expo/vector-icons";

export default function signUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const [curso, setCurso] = useState("");
  const [insituicao, setInstituicao] = useState("");
  const [interesse, setIntresse] = useState("");
  const [picture, setPicture] = useState("");

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
      <Text style={styles.text}>Editar perfil</Text>
      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Apelido"
          value={nickname}
          onChangeText={setNickName}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={curso}
          onChangeText={setCurso}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Instituição"
          value={insituicao}
          onChangeText={setInstituicao}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            trySignUp();
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            SALVAR
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
