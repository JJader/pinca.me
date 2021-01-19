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

import { defaultStyle } from '../styles/index'
import { lightGrey } from '../styles/color'

export default function search() {
  const [users, setUsers] = useState([]);
  const [userFound, setUserFound] = useState("");
  const [isFind, setIsFind] = useState(false);

  const searchUser = (search) => {
    if (search == "") {
      setUsers([]);
    } else {
      searchByName(search).then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          const close = () => { return setIsFind(false) }
          return { id, close, ...data }
        })
        setUsers(users)
      })
    }
  };

  function ProfileModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isFind}
        onRequestClose={() => closeModal()}
      >
        <ProfileScreen user={userFound} />
      </Modal>
    );
  }

  function closeModal() {
    setUserFound("");
    setIsFind(false);
  }

  function userItem(item) {
    return (
      <TouchableOpacity
        style={styles.buttonItem}
        onPress={() => clickOnUser(item)}
      >
        <Text style={styles.name}>{item.name} </Text>
        <Text style={styles.email}> {item.email}</Text>
      </TouchableOpacity>
    );
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
        renderItem={({ item }) => userItem(item)}
        key={({ item }) => item.id}
      />

      <ProfileModal />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 20,
  },

  email: {
    color: lightGrey,
  },
});
