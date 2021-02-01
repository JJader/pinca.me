import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { searchByName } from "../api/user";
import ProfileScreen from "./profileScreen";
import { pink } from "../styles/color";

import { defaultStyle } from "../styles/index";
import UserBar from "../components/button/userBar";
import { auth } from "../config/firebase";

export default function search({ user, navigation }) {

  const [users, setUsers] = useState([]);

  const searchUser = (search) => {
    if (search == "") {
      setUsers([]);
    } else {
      searchByName(search).then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          const talk = () => {
            return talkWithMe(id);
          };
          return { id, talk, ...data };
        });
        setUsers(users);
      });
    }
  };

  function talkWithMe(destinataryId) {
    navigation.navigate("chat", { destinataryId });
  }

  function clickOnUser(user) {
    navigation.navigate('profile', { user })
  }

  return (
    <View style={defaultStyle.container}>
      <StatusBar backgroundColor='black' />
      <Text style={defaultStyle.title}>Pesquisar</Text>

      <TextInput
        style={defaultStyle.input}
        onChangeText={searchUser}
        placeholder="Pesquisar"
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
    </View>
  );
}
