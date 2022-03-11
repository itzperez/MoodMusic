import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Colors from '../../Themes/colors';
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
import { db } from '../../firebase.js';
import { doc, getDoc, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import AppLoading from 'expo-app-loading';
import { getAuth } from "firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';
import Heart from '../../assets/Images/heart.svg';
import Community from '../../assets/Images/community.svg';

const gratitudeSongs = [
    {
        rank: 1,
        songName: 'Gratitude',
        artistName: 'Brandon Lake',
        imageUrl: "https://i.scdn.co/image/ab67616d000048518794282921c5e78dc245ff90",
        numberVotes: 55,
    },
    {
        rank: 2,
        songName: 'Grateful',
        artistName: 'dhruv',
        imageUrl: "https://i.scdn.co/image/ab67616d000048516f04e53cb5309f8e88286842",
        numberVotes: 27,
    },
]

const kindnessSongs = [
    {
        rank: 1,
        songName: 'Treat People With Kindness',
        artistName: 'Harry Styles',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485177fdcfda6535601aff081b6a",
        numberVotes: 28,
    },
    {
        rank: 2,
        songName: 'Kindness',
        artistName: 'MO',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851432ad46607948c43b98034e4",
        numberVotes: 14,
    },
]

const lossSongs = [
    {
        rank: 1,
        songName: 'Gone Too Soon',
        artistName: 'Daughtry',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851c52162f54aa26ff5bc52560a",
        numberVotes: 30,
    },
    {
        rank: 2,
        songName: 'I Will Not Say Goodbye',
        artistName: 'Danny Gokey',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485119ce87ff89f9b56a1ea6ff84",
        numberVotes: 23,
    },
    {
        rank: 3,
        songName: 'Broken',
        artistName: 'Lifehouse',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851b67e8ac9a5b999b2907b2f64",
        numberVotes: 7,
    },
]

const happySongs = [
    {
        rank: 1,
        songName: 'Happy',
        artistName: 'Pharrel Williams',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851e8107e6d9214baa81bb79bba",
        numberVotes: 50,
    },
    {
        rank: 2,
        songName: 'Happy Together',
        artistName: 'The Turtles',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485172649ad8e79d1e8bdd54c929",
        numberVotes: 47,
    },
    {
        rank: 3,
        songName: 'Tongue Tied',
        artistName: 'Grouplove',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851d84a9bbcba91cb6a4a212b1b",
        numberVotes: 24,
    },
]

const relationshipSongs = [
    {
        rank: 1,
        songName: 'Summer Of Love',
        artistName: 'Shawn Mendes',
        imageUrl: "https://i.scdn.co/image/ab67616d00004851a111c87c210cc9bff93948bd",
        numberVotes: 53,
    },
    {
        rank: 2,
        songName: 'Speechless',
        artistName: 'Dan + Jay',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485105e4408393e1c81a8ab1bf26",
        numberVotes: 47,
    },
    {
        rank: 3,
        songName: 'Beautifu',
        artistName: 'Bazzi ft. Camila Cabello',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485105559264ebef3889709826cf",
        numberVotes: 24,
    },

]

const lonelySongs = [
    {
        rank: 1,
        songName: 'Mr Lonely',
        artistName: 'Bobby Vinton',
        imageUrl: "https://i.scdn.co/image/ab67616d000048515980cda6de8365d077f34a5e",
        numberVotes: 47,
    },
    {
        rank: 2,
        songName: 'Why',
        artistName: 'Shawn Mendes',
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273269423eb6467e308c0fbce24",
        numberVotes: 38,
    },



]

const familySongs = [
    {
        rank: 1,
        songName: 'Family Ties',
        artistName: 'Kendrick Lamar ft. Baby Keem',
        imageUrl: "https://i.scdn.co/image/ab67616d000048511bfa23b13d0504fb90c37b39",
        numberVotes: 47,
    },

]


const friendshipSongs = [
    {
        rank: 1,
        songName: 'Friends Like Me',
        artistName: 'Will Smith',
        imageUrl: 'https://i.scdn.co/image/ab67616d000048519986d69836eac008a927b032',
        numberVotes: 19,
    },
]


const heartbreakSongs = [
    {
        rank: 1,
        songName: 'Hearbreak Anniversary',
        artistName: 'Giveon',
        imageUrl: "https://i.scdn.co/image/ab67616d0000485118ff322fcdd47c9400872da6",
        numberVotes: 16,
    },
]

const findCommunities = [
    {
        id: 1,
        name: 'Gratitude',
        description: 'A community for anyone who wants to feel gratitude or share the gratitude they are experiencing.',
        color: '#3b8ea5',
        numberOfMembers: 37,
        songs: gratitudeSongs,
    },
    {
        id: 2,
        name: 'Kindness',
        description: 'A community for people who value kindness and want to share kindness.',
        color: '#DEC20B',
        numberOfMembers: 98,
        songs: kindnessSongs,
    },
    {
        id: 3,
        name: 'Loneliness',
        description: 'A community for people struggling with loneliness or are feeling lonely.',
        color: '#993300',
        numberOfMembers: 64,
        songs: lonelySongs,
    },
    {
        id: 4,
        name: 'Family',
        description: 'A community to share anything related to families.',
        color: '#29a329',
        numberOfMembers: 55,
        songs: familySongs,
    },
    {
        id: 5,
        name: 'Friendship',
        description: 'A community to share anything related to friendships.',
        color: '#0066cc',
        numberOfMembers: 84,
        songs: friendshipSongs,
    },
    {
        id: 6,
        name: 'Heartbeak',
        description: 'A community for people struggling with hearbreak or are feeling heartbroken.',
        color: '#7044a9',
        numberOfMembers: 18,
        songs: heartbreakSongs,
    },
]

const myCommunities = [
    {
        id: 1,
        name: 'Happiness',
        description: 'A community for anyone who wants to feel happier or share the happiness they are experiencing.',
        color: '#cc7a00',
        numberOfMembers: 87,
        songs: happySongs,
    },
    {
        id: 2,
        name: 'Relationships',
        description: 'A community to share anything related to romantic relationships.',
        color: '#a94487',
        numberOfMembers: 112,
        songs: relationshipSongs,
    },
    {
        id: 3,
        name: 'Dealing with loss',
        description: 'A community for those who have experienced a loss',
        color: '#7300e6',
        numberOfMembers: 48,
        songs: lossSongs,
    },
]

export default function ProfileScreen() {
    const [currUser, fetch] = useState({});
    const [allDocs, setAllDocs] = useState([]);
    const [showSongs, setShowSongs] = useState(false);
    const navigation = useNavigation();

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

    const getUserInfo = async (user) => {
        const docRef = doc(db, 'users', user.uid)
        let docSnap = await getDoc(docRef)
        if (docSnap.exists) {
            fetch(docSnap.data());
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            getUserInfo(user);

        } else {
            // No user is signed in
        }
    }, [])

    useEffect(() => {
        const fetchPostsData = async () => {
            let docsPromise = await getDocs(collection(db, 'posts'));
            let docsArr = docsPromise.docs.map(document => document.data());
            let sortedDocsArr = docsArr.sort((a, b) => a.time < b.time);
            let filteredDocsArr = sortedDocsArr.filter((item) => {
                return item.userName === currUser.first_name;
            });
            if (filteredDocsArr.length > 5) {
                filteredDocsArr.length = 5;
            }
            if (filteredDocsArr.length > 0) {
                setShowSongs(true);
            }
            setAllDocs(filteredDocsArr);
        };

        const result = fetchPostsData();
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
        };
    }, [currUser]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchPostsData = async () => {
                let docsPromise = await getDocs(collection(db, 'posts'));
                let docsArr = docsPromise.docs.map(document => document.data());
                let sortedDocsArr = docsArr.sort((a, b) => a.time < b.time);
                let filteredDocsArr = sortedDocsArr.filter((item) => {
                    return item.userName === currUser.first_name;
                });
                if (filteredDocsArr.length > 5) {
                    filteredDocsArr.length = 5;
                }
                if (filteredDocsArr.length > 0) {
                    setShowSongs(true);
                }
                setAllDocs(filteredDocsArr);
            };

            const result = fetchPostsData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [currUser])
    );

    useEffect(() => {
        if (allDocs.length > 0) {
            setShowSongs(true);
        } else {
            setShowSongs(false);
        }
    }, [allDocs])

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const nextScreen = (item) => {
        console.log('item --->', item);
        if (myCommunities.some(elem => elem.name === item.name)) {
            navigation.navigate('CommunityScreen', {community: item});
        } else{
            navigation.navigate('JoinCommunityScreen', {community: item});
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.songItem}>
                <Image source={{ uri: item.image }} style={styles.songImage} />
                <Text style={styles.songText}>{item.song}</Text>
            </View>
        );
    }

    const renderCommunities = ({ item }) => {
        return (

            <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 130,
                height: 130,
                backgroundColor: item.color,
                borderRadius: 10,
                marginHorizontal: 15,
            }} onPress={() => nextScreen(item)}>

                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontFamily: 'Rubik_400Regular' }}>
                    {item.name}
                </Text>

            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileBasicsContainer}>
                <Text style={{ fontFamily: 'Rubik_300Light', fontSize: 15, textTransform: 'uppercase' }}>My Profile</Text>
                <Image source={require('../../assets/Images/YOU.png')} />
                <Text style={{ fontFamily: 'Rubik_700Bold', fontSize: 25 }}>{currUser.first_name} {currUser.last_name}</Text>
            </View>

            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statItemNum}>72</Text>
                    <Text style={styles.statItemText}>Friends</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statItemNum}>128</Text>
                    <Text style={styles.statItemText}>Songs Shared</Text>
                </View>
            </View>
            <View style={styles.sharedSongsContainer}>
                <Text style={{ fontFamily: 'Rubik_500Medium', fontSize: 20, textAlign: 'left', marginBottom: 15, textTransform: 'uppercase' }}>Recently Shared Songs</Text>
                {
                    showSongs ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={allDocs}
                            renderItem={renderItem}
                            horizontal={true}
                        /> : <Text>You haven't shared any songs yet!</Text>
                }
            </View>
            <View style={{ flex: .2, flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                <Text style={{ fontFamily: 'Rubik_500Medium', fontSize: 20, textAlign: 'left', marginBottom: 15, textTransform: 'uppercase' }}>MY COMMUNITIES </Text>
            </View>

            <View style={styles.communitiesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={myCommunities}
                    renderItem={renderCommunities}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: '100%',
        width: '100%'
    },
    profileBasicsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        flex: 0.7
    },
    stats: {
        flexDirection: 'row',
        width: '90%',
        flex: 0.3,
        alignItems: 'center'
    },
    statItem: {
        flex: 1,
        alignItems: 'center'
    },
    statItemNum: {
        fontFamily: 'Rubik_500Medium',
        fontSize: 20
    },
    statItemText: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    sharedSongsContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '90%',
        flex: 0.8
    },
    songItem: {
        height: 150,
        width: 150,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5
    },
    songImage: {
        borderRadius: 10,
        aspectRatio: 1,
        flex: 1
    },
    songText: {
        flex: 0.2,
    },
    communitiesContainer: {
        flex: 0.8,
        width: '90%'
    }
});