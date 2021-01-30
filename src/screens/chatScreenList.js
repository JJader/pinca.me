import { useScrollToTop } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'

import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getUserData } from '../api/user'
import { database, auth } from '../config/firebase'
import AsyncStorage from '@react-native-community/async-storage'
import UserBar from "../components/button/userBar";



export default function chatScreenList({ navigation }) {


    const [Chats, setChats] = useState([])
    const [IDs, setIDs] = useState([])
    const [Name, setName] = useState('')
    const userRef = auth.currentUser.uid

    useEffect(() => {
        const chatRef = getUserData(userRef).then((chat) => {
            const id = (chat.data().chats)
            setIDs(id)
            creatObj().then()
        })
    }, [])


    async function getNames(Chats) {
        const users = Chats.split('_')
        const user0Data = await getUserData(users[0])
        const user1Data = await getUserData(users[1])

        if (user0Data.id == auth.currentUser.uid) {
            return (user1Data.data())
        } else {
            return (user0Data.data())
        }
    }

    async function creatObj() {
        let newChat = [];
        for (let index = 0; index < IDs.length; index++) {
            const user = await getNames(IDs[index]);
            const id = IDs[index];
            const obj = { user, id };
            newChat.push(obj);
        }
        setChats(newChat)
        console.log(newChat)
    }

    return (
        <View>
            <Text>Flat</Text>
            < FlatList
                data={Chats}
                renderItem={({ item }) => {
                    return (
                        <UserBar
                            name={item.user.name}
                            image={item.user.picture}
                            styleText={{ fontSize: 18 }}
                            style={{ marginTop: 30 }}
                            onPress={() => navigation.navigate('chat', { chatId: item.id })}
                        />
                    )
                }}

                key={({ item }) => item.id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C4C4C4",
        marginLeft: 1,
        alignSelf: "center",
        padding: 1,
        borderRadius: 1,
    },
})