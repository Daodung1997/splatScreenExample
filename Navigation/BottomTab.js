import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import TodoScreen from '../screens/TodoScreen';
import ProfileScreen from '../screens/ProfileScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createMaterialBottomTabNavigator();
function BottomTabHome() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{
                backgroundColor: '#1e8d36',
            }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Todo"
                component={TodoScreen}
                options={{
                    tabBarLabel: 'Todo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="application-edit" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="archive-cog" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabHome
