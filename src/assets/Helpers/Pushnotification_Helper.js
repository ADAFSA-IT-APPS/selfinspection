import messaging from '@react-native-firebase/messaging';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableHighlight,
  DeviceEventEmitter,
  Image,
  PermissionsAndroid,
  AppState, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../navigation/NavigationService';
import { v4 as uuidV4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';
import { Pushnotificationcreen } from '../../Redux/actions/SI_Action'


const getNewUUID = () => uuidV4().toLowerCase()

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  let checkToken = /* 'fX5rlQIGtGY:APA91bFdz6fT4A69PQgk9nfn2ogl1GC4FwmuoJsawOy-_d35EDMma54uMIoq4F2OoQIZYh2GapGJ2k4rn8qsEFr1pkOhg2BkMWaQQ37LfhuoFopkkaW19dLrO1fVWE0WRPtJVWIEOPKt'  */await AsyncStorage.getItem('fcmToken');
  console.log('old token', checkToken);
  if (!checkToken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmToken', fcmtoken)
        console.log('new token', fcmtoken);
      }
    } catch (error) {
      console.log('error in fcmToken', error);
      Platform.OS == 'android' &&
        alert('Self Inspection Wont run without Google Play Services, Which are not supported by your device');
    }
  }

  
}

export const NotificationListner = async () => {
  // const dispatch = useDispatch();
  console.log('notification listner',);
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    // await AsyncStorage.setItem('pushnotification', 'true', () => {
    //   NavigationService.navigate('CallScreen', { callData: remoteMessage, fromNotifications: true });
    // })
    NavigationService.navigate('CallScreen', { callData: remoteMessage });

    //dispatch(PUSHNOTIFICATION_SCREEN());
  });


  // Check whether an initial notification is available

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (Platform.OS === 'android') {
          console.log('navigate screen for android',);
          NavigationService.navigate('CallScreen', { callData: remoteMessage});
        }

        console.log('check push notification',);
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        console.log('remote message', remoteMessage.notification);
      }
      //setLoading(false);
    });
}
export const backgroundHandler = async () => {
  messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log('message handled in background>>>>>>', remoteMessage);
   // NavigationService.navigate('CallScreen', { callData: remoteMessage });
  })
}


function setupCallKeep() {
  const options = {
    android: {
      alertTitle: 'Permissions Required',
      alertDescription:
        'This application needs to access your phone calling accounts to make calls',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'ic_launcher',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
    },
  };

  try {
    RNCallKeep.setup(options);
    RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
  } catch (err) {
    console.error('initializeCallKeep error:', err.message);
  }
}