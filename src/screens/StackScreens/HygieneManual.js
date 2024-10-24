//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,Dimensions, TouchableOpacity } from 'react-native';
import TaskNavbar from '../../Components/Navbar/TaskNavbar';
import { Colors } from '../../Util/CommonStyle';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// create a component
const HygieneManual = ({ route }) => {
    const { header, item } = route.params;
    const [items, setItems] = useState(item);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log('item', items.length);
    }, []);

    const prevNext = () => {
        if (currentIndex < 0 | currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (currentIndex === items.length - 1) {
            setCurrentIndex(prev => prev - 1);
        }
    }
    return (
        <View style={styles.container}>
            <TaskNavbar taskno={header} />
            {/*   {item.map((item, index) => ( */}
            <View style={{ flex: 1 }}>
                {/* <ReactNativeZoomableView
                    maxZoom={1}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    captureEvent={true}
                    onZoomAfter={this.logOutZoomState}
                    style={{
                        padding: 10,
                        backgroundColor: '#fff',
                    }}
                > */}
                    <Image style={[styles.pic, { alignSelf: 'center', resizeMode: 'contain'  ,width:width/1.2,height:height/1.5}]} source={item[currentIndex]} />
                {/* </ReactNativeZoomableView> */}
                {(items.length)>1 &&
                <TouchableOpacity onPress={() => prevNext()} style={{ backgroundColor: Colors.primary, width: '90%', position: 'absolute', bottom: '6%', alignItems: 'center', marginHorizontal: '5%', borderRadius: 5 }}>
                    <Text style={{ color: '#fff', paddingVertical: 15 }}>{currentIndex === items.length - 1 ? 'Previous' : 'Next'}  </Text>
                </TouchableOpacity>
}
            </View>
            {/*  ))} */}
        </View> 
    );
};

// define your styles 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pic: {
        height: '100%',
    }
});

//make this component available to the app
export default HygieneManual;
