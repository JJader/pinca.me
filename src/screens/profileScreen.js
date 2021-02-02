import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";

import { useFocusEffect } from '@react-navigation/native'

import { getPosts, updateUserProjects } from "../api/posts";
import { auth, database } from "../config/firebase";

import { Avatar } from "react-native-elements";
import { singOut } from "../api/login";
import Button from '../components/button/button'
import Icon from '../components/icons/containerIcon'

import Card from "../components/card/card";
import { defaultStyle } from "../styles/index";
import { lightGrey, pink } from "../styles/color";
import { StatusBar } from "react-native";

const CURRENT_PROFILE = 'EDITE SEU PERFIL'
const OTHER_PROFILE = 'ENVIE UMA MENSSAGEM'

export default function profileScreen({ user, navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState("");
  const [screenState, setScreenState] = useState(CURRENT_PROFILE);
  const [refreshing, setRefreshing] = useState(false);

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
      const destinataryId = route.params.user.id
      navigation.navigate("chat", { destinataryId });
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

  function updateScroll() {
    if (screenState == CURRENT_PROFILE) {
      setRefreshing(true);
      updateUserProjects().then()
      setRefreshing(false);
    }
  }

  const iconName = (
    screenState != CURRENT_PROFILE ? undefined :
      'exit-run'
  )

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => updateScroll()}
        />
      }
    >
      <StatusBar backgroundColor='black' />
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
              styleButton={styles.button}
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
              onUserPress={
                (user) => { navigation.navigate('profile', { user }) }
              }
              onPostPress={(post, user) => {
                navigation.navigate('moreinfo', { ...post, user })
              }
              }
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

  button:{
    ...defaultStyle.button,
    maxHeight:40,
    marginVertical:10
  }

});
