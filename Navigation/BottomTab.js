import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import TodoScreen from '../screens/TodoScreen';
import ProfileScreen from '../screens/ProfileScreen'
import BillScreen from "../screens/BillScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createMaterialBottomTabNavigator();
import {useState} from "react";
import NetInfo from '@react-native-community/netinfo'
function BottomTabHome() {

    const [colorBg, setColorBg] = useState('#1e8d36')

    //? Thông báo khi không có kết nối mạng
    NetInfo.fetch().then(state => {
        if(!state.isConnected){
            alert('No connect internet !!!')
        }
    })

    return (
        <Tab.Navigator
            initialRouteName="Profile"
            backBehavior={'history'}
            barStyle={{
                backgroundColor: colorBg,
                borderTopWidth: 4,
                borderColor: '#fff'
            }}
            screenOptions={{
                headerShown: false
            }}
            tabBarIcon
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Note Calendar',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="archive-cog" color={color} size={26} />
                    ),
                }}
                listeners={{
                    tabPress: e => {
                        setColorBg('#1e8d36')
                    }
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                listeners={{
                    tabPress: e => {
                        setColorBg('#051d6b')
                    }
                }}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="BillBorrow"
                component={BillScreen}
                listeners={{
                    tabPress: e => {
                        setColorBg('#964f03')
                    }
                }}
                options={{
                    tabBarLabel: 'Bill Borrow',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-text-clock" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Todo"
                component={TodoScreen}
                listeners={{
                    tabPress: e => {
                        setColorBg('#b10b79')
                    }
                }}
                options={{
                    tabBarLabel: 'Todo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="application-edit" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabHome
