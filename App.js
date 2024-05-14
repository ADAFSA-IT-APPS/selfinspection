import React, { useEffect, useRef } from "react";
import { View, StyleSheet, DeviceEventEmitter, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './src/i18n'
import Stacks from "./src/navigation/stack";
import SplashScreen from "react-native-splash-screen";
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import SI_reducer from "./src/Redux/reducers/SI_reducer";
import CustomError from "./src/Components/modals/CustomeError";
import { persistReducer, persistStore } from 'redux-persist';/* redux-persist/es/persistReducer */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import ForegroundHandler from './src/assets/Helpers/Foreground_Handler'
import { requestUserPermission, NotificationListner, backgroundHandler } from './src/assets/Helpers/Pushnotification_Helper'
import { LogBox } from 'react-native';
import wss from "./src/assets/Helpers/helpers";
window.navigator.userAgent = "react-native";
import NavigationService from "./src/navigation/NavigationService";
import io from "socket.io-client";

import { Manager } from "socket.io-client";




LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const persistConfig = {
  timeout: 1000,
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, SI_reducer)

let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)


//const store = createStore(SI_reducer, applyMiddleware(thunk))


const App = () => {

  useEffect(() => {
    console.log('app', );
    requestUserPermission();    
    NotificationListner();
    // ForegroundHandler();
      backgroundHandler();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message data', remoteMessage);
      NavigationService.navigate('CallScreen', { callData: remoteMessage});
    })
    return unsubscribe;
  }, [])



  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate /* loading={null}  */ persistor={persistor}>
          <SafeAreaProvider style={styles.container}>
            {/* <Provider store={store}> */}
            <Stacks />
            {/*   </Provider> */}
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

