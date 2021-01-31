import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

import { useFocusEffect } from '@react-navigation/native'

import { getPosts } from "../api/posts";
import { getUserData } from "../api/user";
import { auth, database } from "../config/firebase";

import { Avatar } from "react-native-elements";
import { singOut } from "../api/login";
import Button from '../components/button/button'
import Icon from '../components/icons/containerIcon'

import defaultPic from "../assets/defaultPic.jpg";
import Card from "../components/card/card";
import { defaultStyle } from "../styles/index";
import { lightGrey, pink } from "../styles/color";

const CURRENT_PROFILE = 'EDITE SEU PERFIL'
const OTHER_PROFILE = 'ENVIE UMA MENSSAGEM'

export default function profileScreen({ user, navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState("");
  const [screenState, setScreenState] = useState(CURRENT_PROFILE);

  useFocusEffect(
    useCallback(() => {
      let id = '';

      if (route.params && route.params.user) {

        id = route.params.user.id;
        setScreenState(OTHER_PROFILE);

        navigation.setOptions({
          tabBarVisible: false,
        })
      }
      else {
        id = auth.currentUser.uid;
        setScreenState(CURRENT_PROFILE);
        navigation.setOptions({
          tabBarVisible: true,
        })
      }

      const unsubscribe = database
        .collection("users")
        .doc(id)
        .onSnapshot((query) => {
          setUserData(query.data());
          getUserPosts(query.data().projects);
        });

      return () => {
        navigation.setParams({ user: undefined })
        unsubscribe()
      }

    }, [route.params && route.params.user])
  )

  function getUserPosts(ids) {
    getPosts(ids).then((snapshot) => {
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

  function buttonPress() {
    if (screenState == CURRENT_PROFILE) {
      navigation.navigate("edit")
    }
    else if (screenState == OTHER_PROFILE) {
      user.talk();
    }
  }

  function iconPress() {
    if (screenState == CURRENT_PROFILE) {
      singOut();
    }
    else if (screenState == OTHER_PROFILE) {
      navigation.goBack()
    }
  }

  const iconName = (
    screenState != CURRENT_PROFILE ? undefined :
      'exit-run'
  )

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}>
      <View style={defaultStyle.container}>

        <View style={styles.profileTab}>
          <Avatar
            rounded
            source={{ uri: userData.picture }}
            size="xlarge"
          />

          <View style={styles.profileInfo}>
            <Icon
              name={iconName}
              style={{ alignSelf: 'flex-end' }}
              onPress={() => iconPress()}
            />

            <Text style={styles.textName} numberOfLines={1}>
              {userData.name}
            </Text>
            <Text style={styles.text}>
              {userData.course}
            </Text>
            <Text style={styles.text}>
              {userData.university}
            </Text>

            <Button
              text={screenState}
              onPress={() => buttonPress()}
            />
          </View>
        </View>

        <View style={styles.descriptionTab}>
          <Text style={{ textAlign: "justify" }}>
            {userData.bio}
          </Text>
        </View>

        <View style={styles.flatView}>
          <Text style={styles.text}>
            Áreas de interesse:
          </Text>

          <FlatList
            style={{ alignSelf: 'center', }}
            horizontal={true}
            data={userData.category}
            renderItem={({ item }) => renderCategory(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{ flex: 1 }}>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  textName: {
    fontSize: 32,
    textAlign: 'center',
  },

  text: {
    color: lightGrey,
  },

  card: {
    backgroundColor: "#C4C4C4",
    marginLeft: 8,
    alignSelf: "center",
    padding: 7,
    borderRadius: 5,
  },

  flatView: {
    flex: 1,
    marginVertical: 20
  },

  profileInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileTab: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: 'center',
  },

  descriptionTab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    minHeight: 150,
  },

});
