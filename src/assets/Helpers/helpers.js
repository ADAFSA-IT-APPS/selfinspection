import CryptoJS from "crypto-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { mediaDevices } from "react-native-webrtc";

const convertTob64 = (s) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(s))
};

export function getDateInUtc(serverDate) {
    const now = new Date(serverDate);
    const fullDate = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    //console.log('fulldate', fullDate);

    let full_Date = fullDate.toString().substr(0, fullDate.toString().length - 3);

    //console.log('full date', full_Date);

    return full_Date;

};

export function getCurrentDate() {
    var now = new Date();
    var fullDate = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

    // ("00" + (d.getMonth() + 1)).slice(-2) +
    // ("00" + d.getDate()).slice(-2) +
    // d.getFullYear() +  
    // ("00" + d.getHours()).slice(-2) +
    // ("00" + d.getMinutes()).slice(-2) +
    // ("00" + d.getSeconds()).slice(-2)    ;
    fullDate = fullDate.toString().substr(0, fullDate.toString().length - 3);
    //fullDate=fullDate.toString();      

    return fullDate;
};

export const Encrypt = word => {
    let key = CryptoJS.enc.Utf8.parse('8080808080808080');
    let iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    let encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), key,
        {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
            keySize: 128 / 8
        }).toString()
    //console.log('elddddd', encryptedlogin);

    encryptedlogin = convertTob64(encryptedlogin);
    //console.log('el', encryptedlogin);

    return encryptedlogin;

}

export const Decrypt = word => {
    return CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8);
}

export const GetAsync = async (key) => {
    try {
        let getKey = await AsyncStorage.getItem(key);
        return getKey != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('errorAsync', e)
    }
}

export const SetAsync = async (key, value) => {
    try {
        let setKey = JSON.stringify(key);
        return setKey = await AsyncStorage.setItem(setKey, value)
    } catch (e) {
        console.log('errorAsync', e)
    }
}

export const removeAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // saving error
    }
}




export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export async function getFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('old token', fcmtoken);
    if (!fcmtoken) {
        try {
            const fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log('new token', fcmtoken);
                AsyncStorage.setItem('fcmtoken', fcmtoken)
            }
        } catch (error) {
            console.log('error in fcmToken', error);
        }
    }
}

export const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        //navigation.navigate(remoteMessage.data.type);
    });
    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                //    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
            //  setLoading(false);
        });

    messaging().onMessage(async remoteMessage => {
        console.log('notofication on foreground state', remoteMessage);
    })
}



// export default class utils {
//     static async getStream() {

//         let isFront = true;
//         const sourceInfos = await mediaDevices.enumerateDevices()
//         let videoSourceId;
//         for (let i = 0; i < sourceInfos.length; i++) {
//             const sourceInfo = sourceInfos[i];
//             if (
//                 sourceInfo.kind == 'videoinput' &&
//                 sourceInfo.facing == (isFront ? 'front' : 'environment')
//             ) {
//                 videoSourceId = sourceInfo.deviceId;
//             }
//         }
//         const stream = await mediaDevices.getUserMedia({
//             audio: true,
//             video: {
//                 width: 640,
//                 height: 480,
//                 frameRate: 30,
//                 facingMode: isFront ? 'user' : 'environment',
//                 deviceId: videoSourceId,
//             },
//         })
//         if (typeof stream != 'boolean') return stream
//         return null;
//     }
// }

// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

//217.165.205.3
export const WS_URL = "wss://adremoteinspection.com"
const wss = new WebSocket(WS_URL
    
    /* {
    rejectUnauthorized: false
} */);
export default wss;

