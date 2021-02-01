import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import UserBar from "../button/userBar";

import { getUserData } from "../../api/user";
import { lightGrey } from "../../styles/color";
import { TouchableOpacity } from "react-native-gesture-handler";

import { defaultStyle } from "../../styles/index";

export default function card({
  item = {},
  onPostPress = () => {},
  onUserPress = () => {},
}) {
  const [userData, setUserData] = useState({ name: "" });

  useEffect(() => {
    getUserData(item.creator).then((snapshot) => {
      if (!snapshot.error) {
        const data = snapshot.data();
        const id = snapshot.id;
        setUserData({id, ...data});
      }
    });
  }, [item.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPostPress(item, userData)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text} numberOfLines={3}>
          {item.description}
        </Text>
      </TouchableOpacity>

      <UserBar
        name={userData.name}
        image={userData.picture}
        onPress={() => onUserPress(userData)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignSelf: "center",
    width: "100%",
    marginVertical: 10,
    height: 130,
    justifyContent: "space-between",
    padding: 10,

    ...defaultStyle.shadow,
  },

  title: {
    fontWeight: "bold",
  },

  text: {
    color: lightGrey,
  },
});
