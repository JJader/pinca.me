import React, { useState, useEffect } from 'react';
import { Button, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';

import Icon from '../icons/containerIcon'
import { pink } from '../../styles/color';
import { StyleSheet } from 'react-native';

export default function ImagePickerExample({
  source,
  style = styles.container,
  onChange = () => { }
}) {
  const [image, setImage] = useState(source);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      onChange(result.uri)
    }
  };

  return (
    <View style={style}>

      <Avatar
        rounded
        size='xlarge'
        source={{ uri: image }}
        onPress={pickImage}
        containerStyle={{ borderWidth: 5, borderColor: pink }}
      />

      <Icon
        style={styles.icon}
        name='lead-pencil'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  icon: {
    marginLeft: -30,
    alignSelf: "flex-end"
  }

})
