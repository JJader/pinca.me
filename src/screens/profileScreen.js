import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import { getUserPosts } from "../api/posts";
import { getUserData } from "../api/user";
import { auth, database } from "../config/firebase";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { singOut } from "../api/login";

import defaultPic from "../assets/defaultPic.jpg";
import Card from "../components/card/card";
import { defaultStyle } from "../styles/index";
import { pink } from "../styles/color";

var unsubscribeUser;

export default function profileScreen({ user, navigation }) {
  const [posts, setPosts] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    let currentUser = auth.currentUser.uid;

    if (user && user.id != currentUser) {
      setIsCurrentUser(false);
      getOtherUser(user.id);
    } else {
      setIsCurrentUser(true);
      getCurrentUser(currentUser);
    }
  }, []);

  function getOtherUser(id) {
    getUserData(id).then((user) => {
      setUserData(user.data());
      getPosts(user.data().projects);
    });
  }

  function getCurrentUser(id) {
    // Depois penso em uma forma mais eficiente de fazer isso
    unsubscribeUser = database
      .collection("users")
      .doc(id)
      .onSnapshot((query) => {
        setUserData(query.data());
        getPosts(query.data().projects);
      });
  }

  function getPosts(ids) {
    getUserPosts(ids).then((snapshot) => {
      setPosts(snapshot);
    });
  }

  function renderCategory(item) {
    return (
      <View style={styles.card}>
        <Text>{item}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}>
      <View style={defaultStyle.container}>
        {isCurrentUser ? null : (
          <AntDesign
            name="back"
            size={24}
            color="#808080"
            style={styles.backButton}
            onPress={() => {
              user.close();
            }}
          />
        )}
        <View style={styles.profileTab}>
          <Image style={styles.profilePic} source={defaultPic} />

          <View style={styles.profileInfo}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={styles.textName}>{userData.name}</Text>
              {isCurrentUser ? (
                <Ionicons
                  name="exit"
                  size={24}
                  color="#808080"
                  onPress={() => {
                    unsubscribeUser();
                    singOut();
                  }}
                />
              ) : null}
            </View>

            <Text style={styles.textCourse}>{userData.course}</Text>
            <Text style={styles.textUniversidade}>{userData.university}</Text>

            {isCurrentUser ? (
              <TouchableOpacity
                style={styles.buttonMessage}
                onPress={() => navigation.navigate("edit")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  EDITE SEU PERFIL
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonMessage}
                onPress={() => {
                  user.talk();
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ENVIE UMA MENSSAGEM
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.descriptionTab}>
          <Text>{userData.bio}</Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 5, marginBottom: 5 }}>
            Áreas de interesse
          </Text>
          <FlatList
            horizontal={true}
            data={userData.category}
            renderItem={({ item }) => renderCategory(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            Projetos realizados
          </Text>

          {posts.map((item) => (
            <Card
              key={item.id}
              item={item}
              onUserPress={(user) => alert(user.name)}
              onPostPress={(post) => alert(post.title)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C4C4C4",
    marginLeft: 8,
    alignSelf: "center",
    padding: 7,
    borderRadius: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  profilePic: {
    marginLeft: 15,
    height: 140,
    width: 140,
    borderRadius: 70,
  },

  profileTab: {
    position: "absolute",
    top: 50,
    left: -8,
    flexDirection: "row",
  },

  textName: {
    fontSize: 32,
    marginRight: 10,
  },

  textUniversidade: {
    color: "#808080",
    fontSize: 14,
  },

  textCourse: {
    marginTop: 5,
    marginBottom: 5,
    color: "black",
    fontSize: 14,
  },

  buttonMessage: {
    marginTop: 8,
    backgroundColor: pink,
    height: 30,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  profileInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  descriptionTab: {
    backgroundColor: "#FAF6F6",
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 120,
  },

  backButton: {
    marginTop: 15,
    marginRight: 320,
  },
});
