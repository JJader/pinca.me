import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";

import { searchByName } from "../api/user";
import ProfileScreen from "./profileScreen";
import { pink } from "../styles/color";

import { defaultStyle } from "../styles/index";
import UserBar from "../components/button/userBar";
import { auth } from "../config/firebase";

export default function search({ user, navigation }) {
  const [users, setUsers] = useState([]);
  const [userFound, setUserFound] = useState("");
  const [isFind, setIsFind] = useState(false);

  const searchUser = (search) => {
    if (search == "") {
      setUsers([]);
    } else {
      searchByName(search).then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          const close = () => {
            return closeModal();
          };
          const talk = () => {
            return talkWithMe(id);
          };
          return { id, talk, close, ...data };
        });
        setUsers(users);
      });
    }
  };

  function ProfileModal() {
    return (
      <Modal animationType="slide" transparent={false} visible={isFind}>
        <ProfileScreen user={userFound}></ProfileScreen>
      </Modal>
    );
  }

  function talkWithMe(destinataryId) {
    navigation.navigate("chat", { destinataryId });
    closeModal();
  }

  function closeModal() {
    setUserFound("");
    setIsFind(false);
  }

  function clickOnUser(user) {
    setUserFound(user);
    setIsFind(true);
  }

  return (
    <View style={defaultStyle.container}>
      <Text style={defaultStyle.title}>Search</Text>

      <TextInput
        style={defaultStyle.input}
        onChangeText={searchUser}
        placeholder="Search"
      />

      <FlatList
        data={users}
        key={({ item }) => item.id}
        renderItem={({ item }) => (
          <UserBar
            name={item.name}
            email={item.email}
            image={item.picture}
            styleText={{ fontSize: 18 }}
            style={{ marginTop: 30 }}
            onPress={() => clickOnUser(item)}
          />
        )}
      />

      {auth.currentUser.uid === userFound.id ? (
        <Modal animationType="slide" transparent={true} visible={isFind}>
          <View
            style={{
              marginTop: 200,
              height: 100,
              width: 350,
              borderRadius: 5,
              backgroundColor: pink,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
              }}
            >
              Este é você! Visualizar seu perfil?
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "black",
                }}
                onPress={() => {
                  closeModal();
                  navigation.navigate("profile");
                }}
              >
                SIM
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginLeft: 50,
                  color: "black",
                }}
                onPress={() => {
                  closeModal();
                }}
              >
                NÃO
              </Text>
            </View>
          </View>
        </Modal>
      ) : (
        <ProfileModal />
      )}
    </View>
  );
}
