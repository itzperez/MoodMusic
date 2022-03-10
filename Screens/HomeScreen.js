import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable, Modal } from 'react-native';
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
import Play from '../assets/Images/Icons/play.svg';
import MessageIcon from '../assets/Images/Icons/message-svgrepo-com.svg';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const fetchPostsData = async () => {
      // const collRef = collection(db, "posts");
      let docsPromise = await getDocs(collection(db, 'posts'));
      let docsArr = docsPromise.docs.map(document => document.data());
      let sortedDocsArr = docsArr.sort((a, b) => a.time < b.time);
      setAllDocs(sortedDocsArr);
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
        let sortedDocsArr = docsArr.sort((a, b) => a.time < b.time);
        setAllDocs(sortedDocsArr);
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

  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.postContainer}>
        <Image source={{ uri: item.image }} style={styles.postImage}></Image>
        <View style={styles.songDetails}>
          <Text style={{ fontFamily: "Rubik_500Medium", fontSize: 30, textAlign: 'center', color: Colors.black }}>{item.song}</Text>
          <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 20, textAlign: 'center', textTransform: 'uppercase', color: Colors.black }}>{item.artist}</Text>   
          {
            item.previewURL !== null ? <TouchableOpacity 
            onPress={() => {
              navigation.navigate("PlaySong", {previewURL: item.previewURL})
            }}
            style={{flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.blue, padding: 10, margin: 10, borderRadius: 10}}
            >
            <Play fill={ Colors.white } style={{width: 30, height: 30, marginRight: 10}} />
            <View>              
              <Text style={{color: Colors.white, textTransform: 'uppercase'}}>Play song</Text>
            </View>
          </TouchableOpacity> : null
          }
          {
            item.caption !== "" ? <Text style={{ fontFamily: "Rubik_400Regular_Italic", fontSize: 15, textAlign: 'center', color: Colors.black, margin: 10 }}>{item.caption}</Text> : null
          }
          
        </View>
        <View style={styles.postProfileInfo} >
          <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 15, textAlign: 'center', textTransform: 'uppercase', color: Colors.white, marginLeft: 15, marginRight: 5 }}>{item.userName}</Text>

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            {
              selectedItem !== undefined ? <View style={styles.modalContainer}>
              <View style={{ alignItems: 'center', }}>
                {
                  selectedItem.mood === "HAPPY" ? <Happy /> : null
                }
                {
                  selectedItem.mood === "SAD" ? <Sad /> : null
                }
                {
                  selectedItem.mood === "CREATIVE" ? <Image source={Images.creative} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                }
                {
                  selectedItem.mood === "ANXIOUS" ? <Anxious /> : null
                }
                {
                  selectedItem.mood === "EXCITED" ? <Excited /> : null
                }
                {
                  selectedItem.mood === "ANGRY" ? <Angry /> : null
                }
                {
                  selectedItem.mood === "CRUSHING" ? <Image source={Images.crushing} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                }
                {
                  selectedItem.mood === "LONELY" ? <Lonely /> : null
                }
                {
                  selectedItem.mood === "HOPEFUL" ? <Image source={Images.hopeful} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                }
                {
                  selectedItem.mood === "SCARED" ? <Image source={Images.scared} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                }
              </View>

              <Text style={{ color: Colors.white, fontFamily: "Rubik_400Regular", fontSize: 20, textAlign: 'center' }}>
                {selectedItem.userName} is feeling {"\n"}
                <Text style={{ fontFamily: "Rubik_700Bold", lineHeight: 50, fontSize: 40 }}>
                  {selectedItem.mood}
                </Text>{"\n"} Go reach out!
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor: Colors.blue, marginTop: 50, padding: 10, borderRadius: 10}}>
                <Text style={{
                  color: Colors.white,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>Return to feed</Text>
              </TouchableOpacity>
            </View> : null
            }
            
          </Modal>
          <Pressable
            style={styles.postEmoji}
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
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
          </Pressable>
          <TouchableOpacity style={{marginLeft: 10, marginRight: 10}} onPress={() => {
            navigation.navigate("Messages");
          }}>
            <MessageIcon style={{width: 43, height: 43, shadowColor: Colors.black, shadowOffset: { width: 1, height: 1 }, shadowOpacity: 1,}} fill={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
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
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 3,
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.purple,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    height: 75,
    backgroundColor: '#3B8EA5',
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postEmoji: {
    height: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    marginLeft: 10,
    marginRight: 10
  },
  modalContainer: {
    backgroundColor: Colors.transparentblack,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
