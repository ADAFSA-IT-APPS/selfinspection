//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import ModalComp from '../Components/modals/ModalComp';
import SI_ImageCont from '../Components/SI_ImageCont';
import AccordionManuals from '../Components/Accordions/AccordionManuals';
import { Data, DataRoutine } from '../Components/DummyData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../navigation/NavigationService';


// create a component
const Join = (props) => {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
 const callData = props?.route?.params?.callData;


 console.log('calldata from join', callData);
    return (
        <View style={styles.container}>
            <Navbar nav={'tab'} />
            <SI_ImageCont />
            <View style={{ flex:1,flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  }}>
                <View style={{marginBottom:10 }}>
                    <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold',borderColor:'#485865',borderWidth:1,padding:10 }}>Default</Text>
                </View>
                <View>
                    <Text style={{ color: '#0F5298', fontSize: 18, fontWeight: 'bold',borderColor:'#485865',borderWidth:1,padding:10 }}>726725762153971235</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                   
                <TouchableOpacity onPress={() =>NavigationService.navigate('Live')} style={[/* styles.taskCont,Acknowledged */{ width: width / 2, backgroundColor: '#5c6672', alignSelf: 'center', marginTop: height / 20, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 5 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center',fontWeight:'bold',fontSize:18 }}>Join</Text>
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
});

//make this component available to the app
export default Join;
