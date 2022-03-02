import { createStackNavigator } from '@react-navigation/stack';
import MoodScreen from './MoodScreen.js';
import SongScreen from './SongScreen.js';

import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function CheckinStack() {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="MoodScreen" component={MoodScreen} />
      <Stack.Screen name="SongScreen" component={SongScreen} />

    </Stack.Navigator>
  );
}


// <Stack.Screen name="AlesundScreen" component={LocationInformation}
//   options={{
//     title: 'Profile',
//     ...TransitionPresets.ModalPresentationIOS,
//   }}
// />
// <Stack.Screen name="SanFranciscoScreen" component={LocationInformation} />
// <Stack.Screen name="LakeLouiseScreen" component={LocationInformation} />
