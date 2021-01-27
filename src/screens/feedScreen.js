import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
} from "react-native";


import BigCard from "../components/card/bigPostCard";
import Card from "../components/card/card";
import FilterModal from "../components/modal/filterModal";

import { getFeedPosts, getFilterPosts } from "../api/posts";

import { defaultStyle } from "../styles/index";

export default function feedScreen({ navigation, route }) {
  const [universityPosts, setUniversityPosts] = useState([]);
  const [personalPost, setPersonalPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterText, setFilterText] = useState("FILTRAR");

  useEffect(() => {
    updatePosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params && route.params.update) {
        updatePosts();
        navigation.setParams({ update: false })
      }
    }, [route.params && route.params.update])
  )

  function updatePosts() {
    setRefreshing(true);

    updatePersonalPosts();
    updateUniversityPosts();

    setRefreshing(false);
  }

  function updatePersonalPosts() {
    getFeedPosts().then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });

      setFilterText("FILTRAR");
      setPersonalPosts(posts);
    });
  }

  function updateUniversityPosts() {
    getFeedPosts().then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });

      setUniversityPosts(posts);
    });
  }

  const tryFilterPosts = (param, operator, value, text) => {
    getFilterPosts(param, operator, value).then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });

      setFilterText(text);
      setPersonalPosts(posts);
    });
  };

  return (
    <ScrollView
      contentContainerStyle={defaultStyle.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => updatePosts()}
        />
      }
    >
      <StatusBar backgroundColor="black" />
      <View style={[defaultStyle.container]}>
        <Text style={defaultStyle.title}>Explorar</Text>

        <Text style={styles.text}>PROJETOS EM DESTAQUE</Text>

        <FlatList
          style={{
            flex: 1,
            marginBottom: 50,
          }}
          data={universityPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BigCard
              item={item}
              onUserPress={(user) => alert(user.name)}
              onPostPress={(post, user) => {
                navigation.navigate('moreinfo', { ...post, user })
              }
              }
            />
          )}
          horizontal={true}
        />

        <FilterModal
          onFilter={tryFilterPosts}
          text={filterText}
          onNoFilter={() => updatePersonalPosts()}
        />

        {personalPost.map((item) => (
          <Card
            key={item.id}
            item={item}
            onUserPress={(user) => alert(user.name)}
            onPostPress={(post) => alert(post.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginBottom: 20,
  },
});
