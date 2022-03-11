import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Like from './assets/Images/like.svg';
import Liked from './assets/Images/liked.svg';

export default function Song({rank, songName, artistName, imageUrl, numberVotes}) {
    const [upVoted, toggle] = useState(false);
    const [upVotes, change] = useState(numberVotes);

    const press = () => {

        if (!upVoted) {
            toggle(true);
            change(upVotes + 1);
        } else {
            toggle(false);
            change(upVotes - 1);
        }
    }




    return (
        <View key={rank} style={{marginBottom: 20, backgroundColor: '#3B8EA5', flex: 1, height: 90, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 15}}>
            <View style={styles.b}>
                <Image source={{uri: imageUrl}} style={{height: 64, width: 64}}/>
            </View>

            <View style={styles.c}>
                <Text numberOfLines={1} style={{fontSize: 22, color: 'white', fontFamily: 'Rubik_400Regular'}}> {songName} </Text>
                <Text numberOfLines={1} style={{color: 'white', fontFamily: 'Rubik_300Light'}}> {artistName} </Text>
            </View>

            <View style={styles.d}>
                <Text numberOfLines={1} style={{color: '#7044A9', fontSize: 40, fontFamily: 'Rubik_400Regular'}}> {rank} </Text>
            </View>

            <TouchableOpacity onPress={press} style={styles.e}>
                {upVoted ? <Liked style={{marginBottom: 2}} height={30} width={30} fill={'black'} /> : <Like style={{marginBottom: 2}} height={30} width={30} fill={'black'} />}
                <Text style={{fontFamily: 'Rubik_400Regular'}}> {upVotes} </Text>

            </TouchableOpacity>


        </View>
    );
}


const styles = StyleSheet.create({
  b: {
      flex: .2,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
  },
  c: {
      flex: .5,
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      marginLeft: 10,
  },
  d: {
      flex: .1,
      flexDirection: 'row',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      alignItems: 'center',
  },
  e: {
      flex: .2,
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      alignItems: 'center',
  },
});
