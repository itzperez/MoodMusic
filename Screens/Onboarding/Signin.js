import { StyleSheet, Text, View, Image} from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {

    return (
        <View style={styles.container}>
            <View style={{flex: .2, justifyContent: 'flex-end', alignItems: 'center'}}>
            </View>

            <View style={{flex: .3, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: 100, width: 100}} source={require('../../assets/Images/musical-note.png')} />
                <Text style={{fontSize: 48, fontFamily: 'Rubik_700Bold'}}>
                    Mood Music
                </Text>
                <Text style={{fontSize: 18}}>
                    Feel, Share, Connect
                </Text>

            </View>

            <View style={{flex: .1, width: '100%', backgroundColor: 'red'}}>

            </View>


            <View style={{flex: .4}}>
            </View>

        </View>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B8EA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
