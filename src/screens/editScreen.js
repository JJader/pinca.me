import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import defaultPic from "../assets/defaultPic.jpg";
import SelectList from "../components/list/selectList";
import { auth } from "../config/firebase";
import { updateUser } from "../api/user";

import { getUserData } from "../api/user";

const items = [
  {
    id: "1",
    name: "Engenharia de computação",
  },
  {
    id: "2",
    name: "Engenharia de produção",
  },
  {
    id: "3",
    name: "Engenharia elétrica",
  },
  {
    id: "4",
    name: "Sistema de informação",
  },
];

export default function editScreen({ navigation }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState([]);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    let currentUser = auth.currentUser.uid;
    getUserData(currentUser).then((userData) => {
      setName(userData.data().name);
      setBio(userData.data().bio);
      setCourse(userData.data().course);
      setUniversity(userData.data().university);
      setCategory(userData.data().category);
      setPicture(userData.data().picture);
    });
  }, []);

  async function salvarDados() {
    const data = {
      name,
      bio,
      course,
      university,
      category,
      picture,
    };

    const id = auth.currentUser.uid;

    let snapshot = await updateUser(id, data);

    if (snapshot.error) {
      alert(snapshot.error.message);
    } else {
      setName("");
      setBio("");
      setCourse("");
      setUniversity("");
      setCategory([]);
      setPicture("");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor="black" />
      <AntDesign
        name="back"
        size={24}
        color="#808080"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.text}>Editar perfil</Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => alert("Trocar Foto!")}
        >
          <Image style={styles.profilePic} source={defaultPic} />
          <Text style={{ marginTop: 5, color: "blue" }}>Alterar imagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        ></TextInput>
        <TextInput
          style={styles.inputBio}
          placeholder="Fale sobre você"
          value={bio}
          onChangeText={setBio}
          multiline={true}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={course}
          onChangeText={setCourse}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Instituição"
          value={university}
          onChangeText={setUniversity}
        ></TextInput>

        <SelectList
          style={styles.selectList}
          text="Area de category"
          inputText="Procurar"
          data={items}
          onItemsChange={setCategory}
          buttonColor="black"
          buttonText="Adicionar"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            salvarDados().then();
            navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            SALVAR
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  text: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 50,
  },
  inputForm: {
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
  inputBio: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#FFF",
    borderColor: "black",
    borderWidth: 2,
    minHeight: 200,
    paddingLeft: 10,
  },
  button: {
    marginBottom: 20,
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
  profilePic: {
    marginTop: 15,
    height: 140,
    width: 140,
    borderRadius: 70,
    opacity: 0.45,
  },
  selectList: {
    marginBottom: 50,
    marginTop: 20,
    paddingLeft: 5,
    height: "100%",
    width: "90%",
  },
});
