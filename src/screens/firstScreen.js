import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Button from '../components/button/button'

import logo from "../assets/logo.png";

import { pink } from "../styles/color";
import { defaultStyle } from '../styles/index'

export default function FirstScreen({ navigation }) {
  return (
    <View style={[defaultStyle.scrollView, { backgroundColor: pink }]}>

      <Image
        source={logo}
        style={styles.logo}
        resizeMode={'contain'}
      />

      <View style={styles.buttonView}>
        <Button
          onPress={() => navigation.navigate("login")}
          text={'LOG IN'}
          styleText={[styles.buttonText, { color: pink }]}
          styleButton={[styles.button, styles.buttonLogin]}
        />

        <Button
          onPress={() => navigation.navigate("signUp")}
          text={'REGISTRE-SE'}
          styleText={styles.buttonText}
          styleButton={styles.button}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: '50%'
  },

  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  },

  buttonView: {
    alignItems: "center",
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
  },

  button: {
    ...defaultStyle.button,
    height: '80%',
    marginBottom: 0,
    marginHorizontal: 5
  },

  buttonLogin: {
    borderWidth: 1.5,
    backgroundColor: "white",
    borderColor: pink,
  },

});
