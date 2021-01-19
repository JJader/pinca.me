import { StyleSheet } from "react-native";
import { pink } from "./color";

export default StyleSheet.create({

  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white'
  },

  title: {
    fontSize: 35,
    marginVertical: 20
  },

  input: {
    padding: 10,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  inputHorizontal: {
    padding: 10,
    height: 140,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20
  },

  button: {
    backgroundColor: pink,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 60,
  },
})
