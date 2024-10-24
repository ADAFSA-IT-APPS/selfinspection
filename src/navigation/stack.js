import React, { useEffect, useState } from "react";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Notifications from "../screens/StackScreens/Notifications";
import SRScreen from "../screens/StackScreens/SRScreen";
import UserDetails from "../screens/StackScreens/UserDetails";
import HygieneManual from "../screens/StackScreens/HygieneManual";
import RootStackScreen from "./rootStack";
import CallScreen from '../screens/CallScreen'
import Join from '../screens/Join'
import { useDispatch, useSelector } from 'react-redux';
import { retrieveToken } from "../Redux/actions/SI_Action";
import Tabs from "./tabs";
import Loading from '../Components/Loading'
import { Gesture } from "react-native-gesture-handler";
import { Easing } from "react-native";
import { navigationRef } from './NavigationService'
import NotificationsStack from './rootStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "../screens/StackScreens/Login";
import LiveTest from "../screens/LiveTest";

import linking from "../../linking";

const Stack = createStackNavigator();

const Stacks = () => {
    const loginState = useSelector(state => state)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [pushNotification, setPushNotification] = useState(true)

    useEffect(() => {
        getPushToken()
        dispatch(retrieveToken())
        //console.log('token',loginState.userToken)
    }, []);
    /* 
        if (loginState.isLoading) {
            return (
                <Loading />
            )
        }
     */

    const getPushToken = async () => {
        let pushnotification = await AsyncStorage.getItem("pushnotification")
        console.log('pushflag',pushnotification );
        setPushNotification(Boolean(pushnotification))
        setLoading(false)
    }

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 100,
            mass: 3,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        }
    }

    const closeConfig = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear
        }
    }

    if (loading) return (<></>)

    return (
        /*   <AuthContext.Provider value={authContext}> */
        <NavigationContainer ref={navigationRef} linking={linking}>
            {/* {loginState.userToken  ? ( */}
                <Stack.Navigator screenOptions=
                    {{
                        gestureEnabled: true,
                        transitionSpec: {
                            open: config,
                            close: closeConfig
                        },
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }} 
                   initialRouteName={loginState.userToken?"Tabs":"Login"} 
                  //  initialRouteName={loginState.userToken?"Tabs":"Tabs"}
                    >
                    <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
                    <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
                    <Stack.Screen options={{ headerShown: false }} name="SRScreen" component={SRScreen} />
                  { <Stack.Screen options={{ headerShown: false }} name="CallScreen" component={CallScreen} />}
                  { <Stack.Screen options={{ headerShown: false }} name="LiveTest" component={LiveTest} />}
                    <Stack.Screen options={{ headerShown: false }} name="Join" component={Join} />
                    <Stack.Screen options={{ headerShown: false }} name="UserDetails" component={UserDetails} />
                    <Stack.Screen options={{ headerShown: false }} name="HygieneManual" component={HygieneManual} />
                    <Stack.Screen options={{ headerShown: false }} name="Login"  component={Login}/>
                </Stack.Navigator> 
           {/*  ) : <RootStackScreen />
             } */}
        </NavigationContainer> 
        /*   </AuthContext.Provider> */
    );
}; 

export default Stacks;
