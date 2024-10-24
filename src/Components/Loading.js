//import liraries
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Overlay,Platform } from 'react-native';
import { useSelector } from 'react-redux';
// create a component
const Loading = () => {
    const state = useSelector(state => state.isLoading);
    return (
      /*   <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View> */
        <View style={{
            width: '100%', height: '100%',
            position: 'absolute', justifyContent: 'center',
            alignSelf: 'center', backgroundColor: '#00000070',zIndex: 2, /* opacity: 0.5, */
        }}>
            <View style={{
                alignSelf: 'center',
                backgroundColor: 'transparent', height: 100, width: 100,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <ActivityIndicator
                    style={{ height: 50, width: 50 }}
                    size={Platform.OS === 'android' ? 50 : 'large'} 
                />
            </View>
        </View>

    )
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
});

//make this component available to the app
export default Loading;



