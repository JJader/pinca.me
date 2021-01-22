import React, { useState, useEffect } from "react";
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

import { getFeedPosts } from "../api/posts";

import { pink, lightGrey } from "../styles/color";
import { defaultStyle } from "../styles/index";
import Card from "../components/card/card";

export default function feedScreen() {
  const [universityPosts, setUniversityPosts] = useState([]);
  const [personalPost, setPersonalPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    updatePosts()
  }, []);

  function updatePosts() {
    setRefreshing(true)
    getFeedPosts().then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setUniversityPosts(posts);
      setPersonalPosts(posts);
      setRefreshing(false)
    });
  }

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
          style={{ flex: 1 }}
          data={universityPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BigCard
              item={item}
              onUserPress={(user) => alert(user.name)}
              onPostPress={(post) => alert(post.title)}
            />
          )}
          horizontal={true}
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
