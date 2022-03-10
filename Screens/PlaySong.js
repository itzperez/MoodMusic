import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable, Modal } from 'react-native';
import { WebView } from "react-native-webview";
import React, { useState, useEffect } from 'react';
import Images from '../assets/Images';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
//import POSTS from '../utils/postStorage.js';
import Lonely from '../assets/Images/Feelings/lonely.svg';
import Happy from '../assets/Images/Feelings/happy.svg';
import Angry from '../assets/Images/Feelings/angry.svg';
import Sad from '../assets/Images/Feelings/sad.svg';
import Anxious from '../assets/Images/Feelings/anxious.svg';
import Excited from '../assets/Images/Feelings/excited.svg';
import Colors from "../Themes/colors";
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
import { db } from '../firebase.js';
import { doc, getDoc, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { ClipPath } from 'react-native-svg';
import { Button } from 'react-native-web';

export default function PlaySong({ route }) {
    // Load fonts
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

    // Check if fonts have loaded
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <WebView source={{ uri: route.params.previewURL }} />
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    postContainer: {
        flex: 1,
        width: 350,
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderColor: Colors.gray,
        borderWidth: 1,
        shadowColor: Colors.black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        marginBottom: 30,
    },
    postImage: {
        flex: 1,
        width: 350,
        height: 350,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        aspectRatio: 1,
    },
    songDetails: {
        marginTop: 10,
        marginBottom: 10
    },
    postProfileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blue,
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },


    searchbar: {
        width: '85%',
        flex: 1,
        margin: 15,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    destinationsDropDown: {
        width: '85%',
        flex: 1,
        marginTop: 15,
    },
    horizontalScroll: {
        width: '85%',
        flex: 8,
        margin: 20,
    },
    destinations: {
        height: '90%',
        width: 291,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    destinationImages: {
        height: 290,
        width: 290,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    destinationText: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '30%',
    },
    titleDescription: {
        margin: 15,
        marginTop: 20,
    },
    destinationTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    destinationDescription: {
        color: 'gray',
        fontSize: 12,
    },
    destinationExplore: {
        margin: 15,
    },
    exploreText: {
        textTransform: 'uppercase',
        fontSize: 10,
        fontWeight: 'bold'
    },
    postEmoji: {
        height: '100%',
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
    },
    modalContainer: {
        backgroundColor: Colors.transparentblack,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
