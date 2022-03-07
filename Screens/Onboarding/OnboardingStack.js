import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signin from './Signin.js';


import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function OnboardingStack() {


  return (
    <NavigationContainer>
        <Stack.Navigator >
              <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>

  );
}
