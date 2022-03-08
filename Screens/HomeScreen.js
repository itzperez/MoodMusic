import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Images from '../assets/Images';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
//import POSTS from '../utils/postStorage.js';
import Lonely from '../assets/Images/Feelings/lonely.svg';
import Happy from '../assets/Images/Feelings/happy.svg';
import Angry from '../assets/Images/Feelings/angry.svg';
import Sad from '../assets/Images/Feelings/sad.svg';
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

// const LOCATIONS = [
//   {
//     id: 1,
//     image: Images.lakeLouise,
//     title: 'Lake Louise',
//     description: 'Lake Louise is rich heritage as one of the world\'s most awe-inspiring mountain destinations.',
//     screenName: 'LakeLouiseScreen'
//   },
//   {
//     id: 2,
//     image: Images.sanFrancisco,
//     title: 'San Francisco',
//     description: 'Grab your coat and a handful of glitter and enter the land of fog and fabulousness.',
//     screenName: 'SanFranciscoScreen'
//   },
//   {
//     id: 3,
//     image: Images.alesund,
//     title: 'Ålesund',
//     description: 'The far northern port of Ålesund might be far wway from the bright lights of metropoliton Norway.',
//     screenName: 'AlesundScreen'
//   }
// ]

const POSTS = [
  {
    id: 1,
    mood: "LONELY",
    song: "Lonely",
    artist: "Noah Cyrus",
    emoji: <Lonely />,
    caption: "Feeling a little sad today.",
    image: Images.lonelyNoahCyrus,
    userName: "Sophia"
  },
  {
    id: 2,
    mood: "HAPPY",
    song: "Happy",
    artist: "Pharrell Williams",
    emoji: <Happy />,
    caption: "Wow! Really loving the weather today.",
    image: Images.happyPharrellWilliams,
    userName: "Ethan"
  },
  {
    id: 3,
    mood: "ANGRY",
    song: "Angry Too",
    artist: "Lola Blanc",
    emoji: <Angry />,
    caption: "Grr...anyone free to talk? Feeling quite mad.",
    image: Images.angryTooLolaBlanc,
    userName: "Alexis"
  },
  {
    id: 4,
    mood: "SAD",
    song: "SAD (Clap Your Hands)",
    artist: "Young Rising Sons",
    emoji: <Sad />,
    caption: "*sniffles*",
    image: Images.sadClapYourHandsYoungRisingSons,
    userName: "Nicholas"
  }

]

export default function HomeScreen() {
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

  const [allDocs, setAllDocs] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      // const collRef = collection(db, "posts");
      let docsPromise = await getDocs(collection(db, 'posts'));
      let docsArr = docsPromise.docs.map(document => document.data());
      setAllDocs(docsArr);
      if (docsArr) {
        console.log(docsArr);
        for (const doc of docsArr) {
          console.log(doc.id, '=>', doc.time);
        }
        console.log("Collection data: ", docsArr);
      } else {
        console.log("No such collection!");
      }
    };

    console.log("Inside useEffect");
    const result = fetchPostsData();
    console.log("RESULT");
    console.log(result);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPostsData = async () => {
        // const collRef = collection(db, "posts");
        let docsPromise = await getDocs(collection(db, 'posts'));
        let docsArr = docsPromise.docs.map(document => document.data());
        setAllDocs(docsArr);
        if (docsArr) {
          console.log(docsArr);
          for (const doc of docsArr) {
            console.log(doc.id, '=>', doc.time);
          }
          console.log("Collection data: ", docsArr);
        } else {
          console.log("No such collection!");
        }
      };

      console.log("Inside useEffect");
      const result = fetchPostsData();
      console.log("RESULT");
      console.log(result);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // Check if fonts have loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // const renderItem = ({ item }) => {
  //   return (
  //     <Pressable onPress={() => {navigation.navigate(item.screenName, {
  //       location: item
  //     })}}>
  //       <View key={item.id} style={styles.destinations}>
  //         <Image source={item.image} style={styles.destinationImages}></Image>
  //         <View style={styles.destinationText}>
  //           <View style={styles.titleDescription}>
  //             <Text style={styles.destinationTitle}>{item.title}</Text>
  //             <Text style={styles.destinationDescription}>{item.description}</Text>
  //           </View>
  //           <View style={styles.destinationExplore}>
  //             <Text style={styles.exploreText}>Explore</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </Pressable>
  //   );
  // }item.image

  const renderItem = ({ item }) => {
    // let imageCode = eval(item.image);
    // const emojiCode = item.emoji;
    return (
      <View key={item.id} style={styles.postContainer}>
        <Image source={{ uri: item.image }} style={styles.postImage}></Image>
        <View style={styles.songDetails}>
          <Text style={{ fontFamily: "Rubik_500Medium", fontSize: 30, textAlign: 'center', color: Colors.black }}>{item.song}</Text>
          <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 20, textAlign: 'center', textTransform: 'uppercase', color: Colors.black }}>{item.artist}</Text>
          <Text style={{ fontFamily: "Rubik_400Regular_Italic", fontSize: 15, textAlign: 'center', color: Colors.black, margin: 10 }}>{item.caption}</Text>
        </View>
        <View style={styles.postProfileInfo} >
          <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 15, textAlign: 'center', textTransform: 'uppercase', color: Colors.white, marginLeft: 15, marginRight: 15 }}>{item.userName}</Text>
          <View style={styles.postEmoji}>
            {
              item.mood === "HAPPY" ? <Happy /> : null
            }
            {
              item.mood === "SAD" ? <Sad /> : null
            }
            {
              item.mood === "CREATIVE" ? <Image source={Images.creative} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
            }
            {
              item.mood === "ANXIOUS" ? <Anxious /> : null
            }
            {
              item.mood === "EXCITED" ? <Excited /> : null
            }
            {
              item.mood === "ANGRY" ? <Angry /> : null
            }
            {
              item.mood === "CRUSHING" ? <Image source={Images.crushing} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
            }
            {
              item.mood === "LONELY" ? <Lonely /> : null
            }
            {
              item.mood === "HOPEFUL" ? <Image source={Images.hopeful} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
            }
            {
              item.mood === "SCARED" ? <Image source={Images.scared} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
            }
          </View>
        </View>
      </View>

      // <View key={item.id} style={styles.postContainer}>
      //   <Image source={item.image} style={styles.postImage}></Image>
      //   <View style={styles.songDetails}>
      //     <Text style={{ fontFamily: "Rubik_500Medium", fontSize: 30, textAlign: 'center', color: Colors.black}}>{item.song}</Text>
      //     <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 20, textAlign: 'center', textTransform: 'uppercase', color: Colors.black}}>{item.artist}</Text>
      //     <Text style={{ fontFamily: "Rubik_400Regular_Italic", fontSize: 15, textAlign: 'center', color: Colors.black, margin: 10}}>{item.caption}</Text>
      //   </View>
      //   <View style={styles.postProfileInfo} >
      //     <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 15, textAlign: 'center', textTransform: 'uppercase', color: Colors.white, marginLeft: 15, marginRight: 15}}>{item.userName}</Text>
      //     {item.emoji}
      //   </View>
      // </View>
    );
  }
  console.log("BEFORE RETURN");
  console.log(allDocs);
  if (allDocs.length > 0) {
    console.log("IN HERE");
    console.log(allDocs);
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allDocs}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <Text>Loading...</Text>
    );
  }

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
});
