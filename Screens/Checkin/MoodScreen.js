import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, ImageBackground, TouchableOpacity, Button} from 'react-native';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import Excited from '../../assets/Images/Feelings/excited.svg';
import Angry from '../../assets/Images/Feelings/angry.svg';
import Surprise from '../../assets/Images/Feelings/surprise.svg';
import Sad from '../../assets/Images/Feelings/sad.svg';
import Scared from '../../assets/Images/Feelings/scared.svg';

const dummy = [
  {
    id: 1,
    feeling: 'HAPPY',
    emoji: Excited,
  },
  {
    id: 2,
    feeling: 'SAD',
    emoji: Sad,
  },
  {
    id: 3,
    feeling: 'MAD',
    emoji: Angry,

  },
  {
    id: 4,
    feeling: 'SURPRISED',
    emoji: Surprise,
  },
]

// <Image source={Images.sanFrancisco} style={{height: 50, width: 50}} />


export default function MoodScreen() {
    const navigation = useNavigation();

    const renderItem = ({item}) => {
      return (

            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('SongScreen', {feeling: item.feeling})}>
                <View style={{flex: .35, height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Excited width={50} height={50} fill={'#FFFFFF'}/>
                </View>
                <Text style={{flex: .65, textAlign: 'center', fontSize: 18}}>
                  {item.feeling}
                </Text>

            </TouchableOpacity>



      );
    }

  return (
    <View style={styles.container}>

        <ImageBackground resizeMode="cover" style={styles.topImage} source={require('../../assets/Images/mountain-background.jpg')} >
            <Text> Good day user </Text>
        </ImageBackground>

        <View style={{flex: .2, justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={styles.question}>
                How are you feeling today?
            </Text>
        </View>

        <View style={styles.bottomHalf} >
            <FlatList
              numColumns={2}
              data={dummy}
              renderItem={renderItem}
            />
        </View>

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
      flex: .3,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
  },
  question: {
      color: '#7044A9',
      fontSize: 36,
      textAlign: 'center',
      marginBottom: 5,
  },
  bottomHalf: {
    flex: .5,
    width: '100%',
  },
  buttons: {
    height: 75,
    backgroundColor: '#3B8EA5',
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
