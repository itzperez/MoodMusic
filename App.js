import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './Screens/HomeStack';
import CheckinStack from './Screens/Checkin/CheckinStack.js';

function Community() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Community!</Text>
    </View>
  );
}


function CheckinScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Check-in!</Text>
    </View>
  );
}

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
        // tabBarOptions={{ showLabel: false }}

const Tab = createBottomTabNavigator();

export default function App() {
    const [isAuthenticated, toggle] = useState(false);



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
});