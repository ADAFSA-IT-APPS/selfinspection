//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import ModalComp from '../Components/modals/ModalComp';
import SI_ImageCont from '../Components/SI_ImageCont';
import AccordionManuals from '../Components/Accordions/AccordionManuals';
import { Data,DataRoutine } from '../Components/DummyData';

// create a component
const Manuals = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Navbar nav={'tab'} />
            <SI_ImageCont />
            <AccordionManuals data={DataRoutine}/>
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
export default Manuals;
