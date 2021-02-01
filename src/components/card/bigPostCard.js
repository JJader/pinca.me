import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import UserBar from "../button/userBar";

import { getUserData } from "../../api/user";
import { lightGrey } from "../../styles/color";
import { defaultStyle } from "../../styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function bigCard({
  item = {},
  onPostPress = () => { },
  onUserPress = () => { },
}) {
  const [userData, setUserData] = useState({ name: "" });

  useEffect(() => {
    getUserData(item.creator).then((snapshot) => {
      const data = snapshot.data();
      const id = snapshot.id
      setUserData({ id, ...data });
    });
  }, [item.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 2 }}
        onPress={() => onPostPress(item, userData)}
      >
        <Image
          source={{
            uri: "https://picsum.photos/seed/" + Math.random() + "/500/500",
          }}
          resizeMode={"cover"}
          style={styles.imagenView}
        />

        <View style={styles.viewText}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.text} numberOfLines={5}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>

      <UserBar
        name={userData.name}
        image={userData.picture}
        style={{ flex: 1 / 4, padding: 10 }}
        onPress={() => onUserPress(userData)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    width: windowWidth * 0.9,
    marginHorizontal: 10,
    height: windowHeight * 0.55,
    ...defaultStyle.shadow,
  },

  viewText: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontWeight: "bold",
    marginVertical: 15,
  },

  text: {
    flex: 1,
    color: lightGrey,
  },

  imagenView: {
    flex: 1.5,
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
