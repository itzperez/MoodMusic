import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import Colors from '../../Themes/colors';
import CommunityScreen from '../Community/CommunityScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="My Profile" component={ProfileScreen} options={{
                headerStyle: {
                    backgroundColor: Colors.purple,
                },
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: 'Rubik_400Regular',
                    letterSpacing: 3,
                    fontSize: 20
                },
                headerTitle: 'MOOD MUSIC'
            }} />
            <Stack.Screen name="CommunityScreen" component={CommunityScreen} options={{
                headerStyle: {
                    backgroundColor: Colors.purple,
                },
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: 'Rubik_400Regular',
                    letterSpacing: 3,
                    fontSize: 20
                },
                headerTitle: 'MOOD MUSIC',
                headerLeft: () => null
            }} />
        </Stack.Navigator>
    );
}