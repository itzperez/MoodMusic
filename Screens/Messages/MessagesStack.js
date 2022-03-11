import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import AllMessagesScreen from './AllMessagesScreen.js';
import ChatScreen from './ChatScreen.js'

const Stack = createStackNavigator();

export default function CheckinStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Messages" component={AllMessagesScreen} options= {(route) => ({
        headerShown: false,
      })}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options= {(route) => ({
        headerShown: true,
        headerTitle: "Chat"
      })}/>

    </Stack.Navigator>
  );
}