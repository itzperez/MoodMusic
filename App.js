import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getAccessToken, getSuggestedSongs } from './utils/apiCalls';
import AppLoading from 'expo-app-loading';
import HomeStack from './Screens/HomeStack';
import CheckinStack from './Screens/Checkin/CheckinStack.js';
import Colors from "./Themes/colors";
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

        // tabBarOptions={{ showLabel: false }}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, toggle] = useState(false);

  function Community() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Community!</Text>
      </View>
    );
  }
  
  // function CheckinScreen() {
  //   return (
  //     // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     //   <Text>Check-in!</Text>
  //     // </View>
  //     <Stack.Navigator>
  //       <Stack.Screen name="SelectSong" component={SelectSong} options={{ headerShown: false }} />
  //     </Stack.Navigator>
  //   );
  // }
  
  function Messages() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Messages!</Text>
      </View>
    );
  }
  
  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'safari'
            } else if (route.name === 'Community') {
            iconName = 'map-pin'
            } else if (route.name === 'Checkin') {
              iconName = 'map-pin'
          } else if (route.name === 'Messages') {
            iconName = 'map-pin'
            } else if (route.name === 'Profile') {
              return <Ionicons name="person" size={size} color={color} />
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Friend Feed'}}/>
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Checkin" component={CheckinStack} options={{headerShown: false}}/>
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
          // tabBarShowLabel: false,


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 30,
    color: Colors.purple
  },
  selectSongContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectSongHeaderImage: {
    width: '100%', 
    height: '100%',
    flex: 1.2,
    marginTop: -50,
    flexDirection: 'row'
  },
  selectSongHeaderText: {
    flex: 3,
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    height: '100%',
    paddingLeft: '7%',
    marginTop: '4%',
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 2,
  },
  selectSongHeaderEmoji: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    height: '100%',
    paddingRight: '7%',
    marginTop: '4%',
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 2,
  },
  searchContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 5,
    borderWidth: 3,
    borderColor: Colors.blue,
    padding: 8,
    borderRadius: 20,
    flex: 5
  },
  suggestedSongsContainer: {
    flex: 4,
    height: '100%',
  }
});




// "tabBarShowLabel": false,
// "tabBarStyle": [
//   {
//     "display": "flex"
//   },
//   null
// ]
