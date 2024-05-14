import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native';
import PushNotification from "react-native-push-notification";

const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log('handle in foreground', remoteMessage);
            const { notification, messageId } = remoteMessage;
            if (Platform.OS == 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification.body,
                    title: notification.title,
                    sound: notification.sound
                });
            } else {
                PushNotification.localNotification({
                    channelId: '',
                    id: messageId,
                    body: 'Andoid body',
                    title: 'Android title',
                    soundName: 'default',
                    vibrate: true,
                    playSound: true
                })
            }
        })

        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler


