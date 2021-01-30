import { useScrollToTop } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'

import { FlatList, View, Text } from 'react-native'
import { database } from '../config/firebase'

export default function chatScreenList({ navigation }) {

    const [Chats, setChats] = useState([])

    /*    useEffect(() => {
            const chatsPrivate = database
                .collection('chats')
                .doc('privateChat')
                .onSnapshot(querySnapshot => {
                    const chats = [];
    
                    querySnapshot.forEach(documentSnapshot => {
                        chats.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    setChats(chats)
                })
            return () => chatsPrivate()
        }, [])
    */


    async function getPrivChats() {
        const chatsRef = database.collection('chats').doc('privateChat')
        const snapshot = await chatsRef.get()
        //let chat = snapshot.map((cid) => cid.id)
        //setChats(chat)
        console.log(snapshot)
    }

    return (
        getPrivChats(),
        //console.log(Chats),
        < FlatList >

        </FlatList >

    )
}
