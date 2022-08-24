import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native'
const BoardingScreen = ({navigation}) => {
    return (
        <Onboarding
            onDone={()=> navigation.navigate("HomeStack", {screen : 'Home'})}
            onSkip={()=> {}}
            pages={[
                {
                    backgroundColor: '#78a3e3',
                    image: <Image source={require('../assets/images/icon1.png')} />,
                    title: 'Màn 1',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#e474ec',
                    image: <Image source={require('../assets/images/icon2.png')} />,
                    title: 'Màn 2',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#97dd7d',
                    image: <Image source={require('../assets/images/icon3.png')} />,
                    title: 'Màn 3',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#e37a7a',
                    image: <Image source={require('../assets/images/icon4.png')} />,
                    title: 'Màn 4',
                    subtitle: 'Done with React Native Onboarding Swiper',
                }
            ]}
        />
    )
}

export default BoardingScreen
