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
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
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
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.input}
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
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },

  title: {
    fontSize: 35,
  },

  input: {
    padding: 10,
    maxHeight: 75,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
  },

  buttonItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize: 20,
  },

  email: {
    color: "#bbbbbb",
  },
});
