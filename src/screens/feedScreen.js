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

import { getFeedPosts, getFilterPosts } from "../api/posts";

import { pink, lightGrey } from "../styles/color";
import { defaultStyle } from "../styles/index";

import Card from "../components/card/card";
import FilterModal from "../components/modal/filterModal";

export default function feedScreen() {
  const [universityPosts, setUniversityPosts] = useState([]);
  const [personalPost, setPersonalPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterText, setFilterText] = useState("FILTRAR");

  useEffect(() => {
    updatePosts();
  }, []);

  function updatePosts() {
    setRefreshing(true);
    getFeedPosts().then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });

      setUniversityPosts(posts);
      setPersonalPosts(posts);
      setFilterText("FILTRAR");
      setRefreshing(false);
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
            marginBottom: 15,
            ...defaultStyle.shadow,
          }}
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

        <FilterModal onFilter={tryFilterPosts} text={filterText} />

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
