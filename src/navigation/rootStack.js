import React, { useEffect, useState, useMemo } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/StackScreens/Login";


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator /* headerMode='false' */>
        <RootStack.Screen options={{ headerShown: false }} name="Login" component={Login}/>
    </RootStack.Navigator>
);

export default RootStackScreen;

