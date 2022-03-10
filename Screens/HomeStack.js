import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PlaySong from './PlaySong';
import LocationInformation from './LocationInformation';
import { TransitionPresets } from '@react-navigation/stack';
import { Button } from 'react-native-web';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="Friend Feed" component={HomeScreen}/>
      <Stack.Screen name="PlaySong" 
        component={PlaySong}
        options={() => ({
          title: ""
        })}
        />

    </Stack.Navigator>
  );
}
