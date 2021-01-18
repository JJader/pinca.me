import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import logo from "../assets/logo.png";

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.containter}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttonTab}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={{ fontSize: 15, color: "#E0174A", fontWeight: "bold" }}>
            LOG IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("signUp")}
        >
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            REGISTRE-SE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#E0174A",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  buttonLogin: {
    borderWidth: 1.5,
    backgroundColor: "white",
    height: 70,
    width: 165,
    borderRadius: 8,
    borderColor: "#E0174A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    marginLeft: 10,
    backgroundColor: "#E0174A",
    height: 70,
    width: 165,
    borderRadius: 8,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
