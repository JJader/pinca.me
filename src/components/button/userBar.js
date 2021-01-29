import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { lightGrey } from "../../styles/color";

export default function userBar({
  name,
  email,
  image,
  style = { height: 40 },
  styleText,
  onPress = () => {},
}) {
  return (
    <View style={[styles.viewUser, style]}>
      <TouchableOpacity onPress={() => onPress()}>
        <Avatar rounded source={{ uri: image }} size="small" />
      </TouchableOpacity>

      <Text style={[styles.userName, styleText]}>{name}</Text>
      <Text style={styles.email}> {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUser: {
    alignItems: "center",
    flexDirection: "row",
  },

  userName: {
    fontWeight: "bold",
    marginLeft: 10,
  },

  email: {
    color: lightGrey,
  },
});
