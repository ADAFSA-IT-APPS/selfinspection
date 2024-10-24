//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Timer = ({setTimeValue,time}) => {
    //const [time, setTime] = useState(null);
    //const { time } = time
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - minutes * 60 - hours * 3600;

    useEffect(() => {
        const timer = setInterval(() => {
            //setTime(prev => prev + 1)
            setTimeValue(prev=>prev+1)
        }, 1000)
        console.log('time>>>>',hours+':',minutes+':',seconds );
        return () => {
            clearInterval(timer);
        };
    }, []);

    /* useEffect */
    return (
        <View style={styles.container}>
            <Text style={styles.time}>
                {hours}:{minutes}:{seconds}
            </Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
      },
      time: {
        fontSize: 18,
      },
});

//make this component available to the app
export default Timer;
