/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { AppRegistry, NativeModules, Platform } from 'react-native';
import { requestUserPermission, NotificationListner, backgroundHandler } from './src/assets/Helpers/Pushnotification_Helper'
//  import RNCallKeep, { AnswerCallPayload } from 'react-native-callkeep';
import App, { handleRemoteMessage } from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/navigation/NavigationService';
// import { v4 as uuidV4 } from 'uuid'
import uuid from 'react-native-uuid';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();


const uuidGenerator = () => {
    return uuid.v4();
}

//  RNCallKeep.setup({
//      ios: {
//          appName: 'My app name',
//      },
//      android: {
//          alertTitle: 'Permissions required',
//          alertDescription: 'This application needs to access your phone accounts',
//          cancelButton: 'Cancel',
//          okButton: 'ok',
//          imageName: 'phone_account_icon',
//          foregroundService: {
//              channelId: 'com.company.my',
//              channelName: 'Foreground service for my app',
//              notificationTitle: 'My app is running on background',
//              notificationIcon: 'Path to the resource icon of the notification',
//          },
//      }
//  }).then(accepted => { });
//  Platform.OS == 'android' && RNCallKeep.setAvailable(true);


/* messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log("\n\n\n\n\n notification listener \n\n\n\n\n\n");
    RNCallKeep.displayIncomingCall(uuidGenerator(), remoteMessage.data.caller, "Self Inspection", "number", true);
}) */

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;
    }  
    return (
        <App />
    );
}





AppRegistry.registerComponent(appName, () => HeadlessCheck);
