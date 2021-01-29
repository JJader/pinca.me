import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

import { searchByName } from "../api/user";
import ProfileScreen from "./profileScreen";

import { defaultStyle } from "../styles/index";
import { lightGrey } from "../styles/color";
import UserBar from "../components/button/userBar";

export default function search({ navigation }) {
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
        <ProfileScreen user={userFound} />
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

      <ProfileModal />
    </View>
  );
}
