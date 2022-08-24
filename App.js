
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import BoardingScreen from "./screens/OnBoardingScreen";
import BottomTabHome from "./Navigation/BottomTab"
const Stack = createStackNavigator()
let STORAGE_LAUNCHED = 'alreadyLaunched'
import store from './store'
import  {Provider} from 'react-redux'
import FlashMessage from "react-native-flash-message";

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(  () => {
    AsyncStorage.getItem(STORAGE_LAUNCHED).then( isFirstOpen => {
          if(isFirstOpen === null){
            AsyncStorage.setItem(STORAGE_LAUNCHED, 'true')
            setIsFirstLaunch(true)
          }else{
            setIsFirstLaunch(false)
          }
        }
    )
  }, [])


  if(isFirstLaunch === null){
    return null;
  }else{
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={ isFirstLaunch ?"OnBoarding" : "HomeStack"}
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {isFirstLaunch && <Stack.Screen name="OnBoarding" component={BoardingScreen}></Stack.Screen>}
                    <Stack.Screen name="HomeStack" component={BottomTabHome}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage style={{marginTop: 30}} position={"top"} />
        </Provider>
    )
  }
}

export default App


