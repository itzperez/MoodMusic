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
        recentText: 'Hi, Ethan! Yeah, I would be down to grab some coffee.'
    },
    {
        id: 3,
        profilePic: require('../../assets/Images/alexis.jpg'),
        firstName: 'Alexis',
        time: '11:34AM',
        recentText: 'Hey Ethan - good to hear from you!'
    },
]

export default function AllMessagesScreen() {
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
    // const signOutNow = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         navigation.replace('Login');
    //     }).catch((error) => {
    //         // An error happened.
    //     });
    // }
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <View style={{ marginLeft: 20 }}>
    //                 <Avatar
    //                     rounded
    //                     source={{
    //                         uri: auth?.currentUser?.photoURL,
    //                     }}
    //                 />
    //             </View>
    //         ),
    //         headerRight: () => (
    //             <TouchableOpacity style={{
    //                 marginRight: 10
    //             }}
    //                 onPress={signOutNow}
    //             >
    //                 <Text>logout</Text>
    //             </TouchableOpacity>
    //         )
    //     })
    // }, [navigation]);

    // useEffect(() => {
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hey there!',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, []);
    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.chatContainer} onPress={() => {
                navigation.navigate("ChatScreen", {profilePic: item.profilePic, recentText: item.recentText});
            }}>
                <View style={styles.profilePicContainer}>
                    <Image source={item.profilePic} style={styles.profilePic} />
                </View>
                <View style={styles.messageContainer}>
                    <View style={styles.nameAndTimeContainer}>
                        <Text style={styles.firstName}>{item.firstName}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.recentText}>{item.recentText}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    return (


        <SafeAreaView style={styles.container}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={CHATS}
            renderItem={renderItem}
            style={{
                marginTop: 10
            }}
            />
        </SafeAreaView>

        // <GiftedChat
        //     messages={messages}
        //     showAvatarForEveryMessage={true}
        //     onSend={messages => onSend(messages)}
        //     user={{
        //         _id: auth?.currentUser?.email,
        //         name: auth?.currentUser?.first_name,
        //         // avatar: auth?.currentUser?.photoURL
        //         avatar: require('../../assets/Images/YOU.png')
        //     }}
        // />
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
    chatContainer: {
        flex: 1,
        height: '100%',
        width: 350,
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1
    },
    profilePicContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstName: {
        flex: 1,
        fontFamily: 'Rubik_400Regular',
        textTransform: 'uppercase'
    }, 
    profilePic: {
        flex: 1,
        height: 60,
        width: 60,
        borderRadius: 100,
        aspectRatio: 1,
    },
    time: {
        flex: 1,
        textAlign: 'right',
        color: Colors.gray
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    recentText: {
        flex: 1,
        color: Colors.lightgray
    },
    nameAndTimeContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});
