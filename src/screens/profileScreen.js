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
        <Text>{item.title}</Text>
        <Text>{start.toLocaleDateString()}</Text>
        <Text>{end.toLocaleDateString()}</Text>
        <Text>{item.descrition}</Text>
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
              <Ionicons
                name="exit"
                size={24}
                color="#808080"
                onPress={() => {
                  unsubscribe();
                  singOut();
                }}
              />
            </View>
            <Text style={styles.textUniversidade}>{userData.university}</Text>

            <View>
              {isCurrentUser ? (
                <TouchableOpacity
                  style={styles.buttonMessage}
                  onPress={() => alert("Voce sera encaminhado para edicao")}
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
        <View style={styles.descritionTab}>
          <Text>{userData.bio}</Text>
        </View>

        <Text style={{ marginTop: 10 }}>Áreas de interesse</Text>
        <View style={styles.areaInteresse}>
          <Text> Python Java Robótica</Text>
        </View>
      </ScrollView>
      <View style={{ height: 200, width: "100%", alignItems: "center" }}>
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Projetos realizados
        </Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => card(item)}
          key={({ item }) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: "white",
    marginVertical: 5,
    alignSelf: "center",
    padding: 5,
    borderRadius: 5,
    width: "100%",
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
  buttonMessage: {
    marginTop: 25,
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
  descritionTab: {
    backgroundColor: "#DCDCDC",
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 120,
  },
  areaInteresse: {
    marginTop: 15,
    backgroundColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 40,
  },
  backButton: {
    marginTop: 15,
    marginRight: 320,
  },
});
