//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TaskNavbar from '../../Components/Navbar/TaskNavbar';
import SI_ImageCont from '../../Components/SI_ImageCont';
import Accordions from '../../Components/Accordions/Accordions';
import { Data,DataRoutine } from '../../Components/DummyData';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import Timer from '../../Components/Timer';

// create a component
const TaskDetailsDaily = ({route}) => {
    const {taskId}=route.params
    
    return (
        <View style={styles.container}>
            <TaskNavbar taskno={taskId} />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', justifyContent: 'flex-end' }}>
                <Text style={styles.p10}>Yes:40</Text>
                <Text style={styles.p10}>No:2</Text>
                <Text style={styles.p10}>N/A:1</Text>
            </View>
            <SI_ImageCont />
            {/* <ScrollView> */}
                <Accordions data={Data} />
           {/*  </ScrollView> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>Completion: 100%</Text>
                </View>
                <View style={{ backgroundColor: '#738591', paddingHorizontal: 20, alignItems: 'center', flex: 1 / 2, paddingVertical: 18, borderTopLeftRadius: 100, borderWidth: 1, borderTopRightRadius: 100, borderColor: '#485865' }}>
                    <Text style={{ color: '#fff' }}>Submit</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    {/* <Text>Timer</Text> */}
                    <Timer/>
                </View>
            </View>
            <View style={{ backgroundColor: '#dedede', height: '4%', }}></View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    p10: { paddingRight: 10, color: '#333232' }
});

//make this component available to the app
export default TaskDetailsDaily;
