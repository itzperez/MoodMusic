import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../../firebase.js';
import { doc, getDoc, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import Colors from "../../Themes/colors";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
    useFonts,
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic
} from '@expo-google-fonts/rubik';

const CHATS = [
    {  
        id: 1,
        profilePic: require('../../assets/Images/sophia.jpg'),
        firstName: 'Sophia',
        time: '9:52PM',
        recentText: 'Hi, Ethan. I appreciate you reaching out!'
    },
    {
        id: 2,
        profilePic: require('../../assets/Images/nicholas.jpg'),
        firstName: 'Nicholas',
        time: '3:18PM',
        recentText: 'Hi, Nicholas! Yeah, I would be down to grab some coffee.'
    },
    {
        id: 3,
        profilePic: require('../../assets/Images/alexis.jpg'),
        firstName: 'Alexis',
        time: '11:34AM',
        recentText: 'Hey Alexis - good to hear from you!'
    },
]

export default function AllMessagesScreen({route}) {
    let [fontsLoaded] = useFonts({
        Rubik_300Light,
        Rubik_300Light_Italic,
        Rubik_400Regular,
        Rubik_400Regular_Italic,
        Rubik_500Medium,
        Rubik_500Medium_Italic,
        Rubik_700Bold,
        Rubik_700Bold_Italic,
        Rubik_900Black,
        Rubik_900Black_Italic
    });
    const navigation = useNavigation();

    // Code from https://blog.logrocket.com/build-chat-app-react-native-gifted-chat/

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: route.params.recentText,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: route.params.profilePic,
                },
            },
        ])
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    // const renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity style={styles.chatContainer}>
    //             <View style={styles.profilePicContainer}>
    //                 <Image source={item.profilePic} style={styles.profilePic} />
    //             </View>
    //             <View style={styles.messageContainer}>
    //                 <View style={styles.nameAndTimeContainer}>
    //                     <Text style={styles.firstName}>{item.firstName}</Text>
    //                     <Text style={styles.time}>{item.time}</Text>
    //                 </View>
    //                 <Text style={styles.recentText}>{item.recentText}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }


    return (


        // <SafeAreaView style={styles.container}>
        //     <FlatList
        //     showsVerticalScrollIndicator={false}
        //     data={CHATS}
        //     renderItem={renderItem}
        //     style={{
        //         marginTop: 10
        //     }}
        //     />
        // </SafeAreaView>

        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.first_name,
                // avatar: auth?.currentUser?.photoURL
                avatar: require('../../assets/Images/YOU.png')
            }}
        />
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
