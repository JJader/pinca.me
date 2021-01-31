import React, { useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useFocusEffect } from '@react-navigation/native'

import { Avatar } from "react-native-elements";

import Close from '../components/icons/closeIcon'
import defaultPic from "../assets/defaultPic.jpg";
import SelectList from "../components/list/selectList";
import { auth } from "../config/firebase";
import { updateUser } from "../api/user";

import { getUserData } from "../api/user";
import { CATEGORY } from '../redux/constants/index'
import { defaultStyle } from "../styles";
import LoadingButton from "../components/button/loadingButton";
import { pink } from "../styles/color";

var CATEGORYList = CATEGORY;

export default function editScreen({ navigation }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [picture, setPicture] = useState("");

  useFocusEffect(

    useCallback(() => {
      let currentUser = auth.currentUser.uid;

      getUserData(currentUser).then((userData) => {
        setName(userData.data().name);
        setBio(userData.data().bio);
        setCourse(userData.data().course);
        setUniversity(userData.data().university);
        setCategory(userData.data().category);
        setPicture(userData.data().picture);
        formatSelectCategory()
      });
    }, [auth.currentUser.uid])

  )

  function formatSelectCategory() {
    const list = category.map((item) => (
      { id: item }
    )
    )

    CATEGORYList.concat(list)
    setSelectCategory(list)
  }

  async function tryUpdateUser() {
    const data = {
      name,
      bio,
      course,
      university,
      category,
      picture,
    };
    const { uid } = auth.currentUser;

    let snapshot = await updateUser(uid, data);

    if (snapshot && snapshot.error) {
      alert(snapshot.error.message);
    }
    else {
      restoreScreen()
      navigation.goBack();
    }
  }

  function restoreScreen() {
    setName("");
    setBio("");
    setCourse("");
    setUniversity("");
    setCategory([]);
    setSelectCategory([]);
    setPicture("");
  }

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}>
      <StatusBar backgroundColor="black" />

      <View style={defaultStyle.container}>

        <View style={styles.headerView}>
          <Text style={defaultStyle.title}>Editar perfil</Text>

          <Close
            onPress={() => navigation.goBack()}
          />
        </View>

        <Avatar
          rounded
          size="xlarge"
          containerStyle={styles.avatar}
          source={defaultPic}
          onPress={() => alert("Trocar Foto!")}
        />

        <TextInput
          style={defaultStyle.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={defaultStyle.input}
          placeholder="Curso"
          value={course}
          onChangeText={setCourse}
        />

        <TextInput
          style={defaultStyle.input}
          placeholder="Instituição"
          value={university}
          onChangeText={setUniversity}
        />

        <TextInput
          style={defaultStyle.inputHorizontal}
          placeholder="Fale sobre você"
          value={bio}
          onChangeText={setBio}
          multiline={true}
        />

        <SelectList
          text="Areas de interesse"
          inputText="Procurar"
          data={CATEGORYList}
          dataSelected={selectCategory}
          onItemsChange={setCategory}
          buttonColor={pink}
          buttonText="SALVAR INTERESSE"
          canAddItems={true}
        />

        <LoadingButton
          text={'SALVAR'}
          onPress={() => tryUpdateUser()}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "white",
  },

  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },

  avatar: {
    alignSelf: "center",
    marginBottom: 15
  },

  button: {
    marginBottom: 20,
  },

  selectList: {
    marginBottom: 50,
    marginTop: 20,
    paddingLeft: 5,
    height: "100%",
    width: "90%",
  },
});
