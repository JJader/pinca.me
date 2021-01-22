import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import BigCard from "../components/card/bigPostCard";

import { getFeedPosts } from "../api/posts";

import { pink, lightGrey } from "../styles/color";
import { defaultStyle } from "../styles/index";
import Card from "../components/card/card";

export default function feedScreen() {
  const [universityPosts, setUniversityPosts] = useState([]);
  const [personalPost, setPersonalPosts] = useState([]);

  useEffect(() => {
    const userId = "xvxGHnARivZI8urHME2uC3PmcIr2"

    getFeedPosts(userId).then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const postId = doc.id;
        return { postId, userId, ...data };
      });
      setUniversityPosts(posts);
      setPersonalPosts(posts);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={defaultStyle.scrollView}>
      <StatusBar backgroundColor="black" />
      <View style={[defaultStyle.container]}>
        <Text style={defaultStyle.title}>Explorar</Text>

        <Text style={styles.text}>PROJETOS EM DESTAQUE</Text>

        <FlatList
          style={{ marginBottom: 70 }}
          data={universityPosts}
          keyExtractor={(item) => item.postId}
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
            key={item.postId}
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
