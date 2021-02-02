import React, { useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { Avatar } from "react-native-elements";

import ImagePicker from "../components/button/imagePicker";
import Close from "../components/icons/closeIcon";
import defaultPic from "../assets/defaultPic.jpg";
import SelectList from "../components/list/selectList";

import { auth } from "../config/firebase";
import { updateUser, uploadImage } from "../api/user";

import { getUserData } from "../api/user";
import { CATEGORY } from "../redux/constants/index";
import { defaultStyle } from "../styles";
import LoadingButton from "../components/button/loadingButton";
import { pink } from "../styles/color";
import { SafeAreaView } from "react-native";

export default function editScreen({ navigation }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState([]);
  const [picture, setPicture] = useState(undefined);
  const [isReady, setIsReady] = useState(false);

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
        setIsReady(true);
      });
    }, [auth.currentUser.uid])
  );

  async function tryUpdateUser(picture) {
    const data = {
      name,
      bio,
      course,
      university,
      category,
      picture: picture,
    };
    const { uid } = auth.currentUser;

    let snapshot = await updateUser(uid, data);

    if (snapshot && snapshot.error) {
      alert(snapshot.error.message);
    } else {
      navigation.goBack();
    }
  }

  function restoreScreen() {
    setName("");
    setBio("");
    setCourse("");
    setUniversity("");
    setCategory([]);
    setPicture(null);
    setIsReady(false);
  }

  return !isReady ? null : (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <ScrollView contentContainerStyle={defaultStyle.scrollView}>
        <StatusBar backgroundColor="black" />

        <View style={defaultStyle.container}>
          <View style={styles.headerView}>
            <Text style={defaultStyle.title}>Editar perfil</Text>

            <Close
              onPress={() => {
                restoreScreen();
                navigation.goBack();
              }}
            />
          </View>

          <ImagePicker source={picture} onChange={setPicture} />

          <TextInput
            style={[defaultStyle.input, { marginTop: 15 }]}
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
            data={CATEGORY}
            dataSelected={category}
            onItemsChange={setCategory}
            buttonColor={pink}
            buttonText="SALVAR INTERESSE"
            canAddItems={true}
            displayKey="id"
          />

          <LoadingButton
            text={"SALVAR"}
            onPress={() =>
              uploadImage(picture, (picture) => tryUpdateUser(picture))
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: "space-between",
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
