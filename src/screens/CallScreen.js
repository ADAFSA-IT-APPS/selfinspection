//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Vibration, TouchableOpacity } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import ModalComp from '../Components/modals/ModalComp';
import SI_ImageCont from '../Components/SI_ImageCont';
import AccordionManuals from '../Components/Accordions/AccordionManuals';
import { Data, DataRoutine } from '../Components/DummyData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../navigation/NavigationService';
import { MotiView } from '@motify/components'
import { Easing } from 'react-native-reanimated';
import InCallManager from 'react-native-incall-manager';
// create a component
const _color = 'red';
const _size = 100;

const CallScreen = props => {
    console.log('param from callscreen', props);

    const callData = props?.route?.params?.callData;
    const [dataPush, setDataPush] = useState('');
    //const fromNotifications = props?.route?.params
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ];
    // useEffect(()=>{
    //     console.log('before in call manager', );
    //     InCallManager.startRingtone({media: 'audio', auto: true});
    //     console.log('after in call manager', );

    // },[])
    useEffect(() => {
        if (callData) {
            console.log('check call data there', callData?.data);
            setDataPush(callData.data)
        }
        console.log('param from callscreen', callData);
        InCallManager.startRingtone({ media: 'audio', auto: true, ringback: '_DEFAULT_' });
        Vibration.vibrate(PATTERN, true)
    }, [callData])

    const answer = () => {
        Vibration.cancel();
        console.log('dataPush', dataPush);
        InCallManager.stopRingtone();

        NavigationService.navigate('LiveTest', { callData: dataPush });
    }
    const cancelCall = () => {
        Vibration.cancel();
        InCallManager.stopRingtone();
        NavigationService.navigate('LiveTest', { callData: dataPush });
    }
    return (
        <View style={styles.container}>
            <Navbar nav={'tab'} />
            <SI_ImageCont />
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', borderColor: 'gray', borderWidth: 5, margin: 10, height: '70%', borderRadius: 5, marginHorizontal: 25, backgroundColor: '#D5F3FE' }}>
                <View >
                    <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold' }}>Incoming Call</Text>
                </View>
                <View>
                    <Text style={{ color: '#0F5298', fontSize: 30, fontWeight: 'bold' }}>{dataPush.caller ? dataPush.caller : 'Inspector'}</Text>
                </View>
                <View>
                    <FontAwesome name="user" color="#B7B7B7" size={150} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <TouchableOpacity onPress={() => answer()} style={{ backgroundColor: 'green', padding: 25, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        {[Array(3).keys()].map((index) => {
                            return <MotiView
                                from={{ opacity: 0.2, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.1 }}
                                transition={{
                                    type: 'timing',
                                    duration: 1500,
                                    loop: true,
                                    // delay: index * 400,
                                    repeatReverse: false
                                    // easing:Easing.out(easing.ease)
                                }}
                                key={index}
                                style={[StyleSheet.absoluteFillObject, styles.dot, { backgroundColor: 'green' }]}
                            />
                        })}
                        <Icon name='phone' color="#D5F3FE" size={30} onPress={() => answer()} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => cancelCall()} style={{ backgroundColor: 'red', padding: 25, borderRadius: 50 }}>
                        <Icon name='phone' color="#D5F3FE" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dot: {
        width: _size,
        height: _size,
        borderRadius: _size,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default CallScreen;
