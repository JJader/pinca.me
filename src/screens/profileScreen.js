import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { getUserPosts } from "../api/posts";
import { getUserData } from "../api/user";
import { auth, database } from "../config/firebase";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { singOut } from "../api/login";

import defaultPic from "../assets/defaultPic.jpg";

import Card from "../components/card/card";

var unsubscribe, unsubscribeUser;

export default function profileScreen({ user, navigation }) {
  const [posts, setPosts] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    let currentUser = auth.currentUser.uid;

    if (user && user.id != currentUser) {
      setIsCurrentUser(false);
      getOtherPosts(user.id);
      getUser(user.id);
    } else {
      setIsCurrentUser(true);
      getCurrentPosts(currentUser);
      getCurrentUser(currentUser);
      getUser(currentUser);
    }
  }, []);

  function getOtherPosts(id) {
    getUserPosts(id).then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      console.log(posts);
      setPosts(posts);
    });
  }

  function getCurrentPosts(id) {
    // Depois penso em uma forma mais eficiente de fazer isso
    unsubscribe = database
      .collection("posts")
      .doc(id)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .onSnapshot((query) => {
        const list = [];

        query.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPosts(list);
      });
  }

  function getUser(id) {
    getUserData(id).then((snapshot) => {
      const userData = snapshot.data();
      setUserData(userData);
    });
  }

  function getCurrentUser(id) {
    // Depois penso em uma forma mais eficiente de fazer isso
    unsubscribeUser = database
      .collection("users")
      .doc(id)
      .onSnapshot((query) => {
        setUserData(query.data());
      });
  }

  function card(item) {
    const start = new Date(item.start);
    const end = new Date(item.end);

    return (
      <View style={styles.card}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ color: "gray" }}>{item.descrition}</Text>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.cardPic} source={defaultPic} />
          <View style={{ marginTop: 8, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Author</Text>
            <Text style={{ color: "gray", fontSize: 13 }}>@author</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategory(item) {
    return (
      <View style={styles.card2}>
        <Text>{item}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        directionalLockEnabled="true"
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
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
                    unsubscribe();
                    unsubscribeUser();
                    singOut();
                  }}
                />
              ) : null}
            </View>

            <Text style={styles.textCourse}>{userData.course}</Text>
            <Text style={styles.textUniversidade}>{userData.university}</Text>

            <View>
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
        </View>
        <View style={styles.descriptionTab}>
          <Text>{userData.bio}</Text>
        </View>
      </ScrollView>

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
          keyExtractor={(item, index) => index}
        />
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Projetos realizados
        </Text>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Card
              item={item}
              onUserPress={(user) => alert(user.name)}
              onPostPress={(post) => alert(post.title)}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    backgroundColor: "white",
    marginVertical: 5,
    alignSelf: "center",
    padding: 5,
    width: "100%",
  },
  cardPic: {
    marginTop: 5,
    marginRight: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  card2: {
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
    backgroundColor: "#E0174A",
    height: 30,
    width: 200,
    borderRadius: 8,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionTab: {
    backgroundColor: "#FAF6F6",
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 120,
  },
  backButton: {
    marginTop: 15,
    marginRight: 320,
  },
});
