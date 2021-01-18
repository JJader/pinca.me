import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import * as firebase from "firebase";

export default function registerStep2({ navigation }) {
  const [nickname, setNickName] = useState();

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
          placeholder="Apelido"
          value={nickname}
          onChangeText={setNickName}
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            REGISTRAR
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.policy}>
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </Text>
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
  policy: {
    marginTop: 32,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
  },
});
