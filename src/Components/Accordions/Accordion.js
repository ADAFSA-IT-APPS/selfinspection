//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { Data, DataRoutine } from '../DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComp from './ModalComp';
import { FontFamily, Colors } from '../../Util/CommonStyle';
import { useNavigation } from '@react-navigation/native';
// import { set } from 'react-native-reanimated';


// create a component
const Accordions = () => {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

  /*   const onPress=(index)=>{
        setCurrentIndex(index === currentIndex ? null : index);
    } */



    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity key={item.id} onPress={() => {
                    setCurrentIndex(index === currentIndex ? null : index);
                }}>
                    <View style={styles.headerCont}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{item.question}</Text>
                            {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
                        </View>
                    </View>   

                    {index === currentIndex && (
                        <View style={{}} >
                            <View style={{ padding: 10 }}>
                                {item.DataInner.map((item, i) => (
                                    <View style={{paddingBottom:10}}>
                                        <Text style={{ color:Colors.primary,paddingBottom:2 }}>{item.question}</Text>
                                        <TouchableOpacity onPress={()=>navigation.navigate('HygieneManual',{ header: item.question,item :item.DataInnerLayer})} style={{ backgroundColor: Colors.primary, width: '30%', alignItems: 'center', borderRadius: 10 }}>
                                            <Ionicons name='eye' color='#fff' size={32} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={'item.image'} />
                            </View>
                        </View>
                    )}

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={DataRoutine}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    index.toString();
                }}
                style={{ flexGrow: 0, height: '90%' }}

            /* ListFooterComponent={renderLoader} */
            /*  onEndReached={loadMoreItem} */
            /* onEndReachedThreshold={0} */
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal:20
    },
    widthff: { width: '45%' },
    headerCont: {
        backgroundColor: '#5c6672',
        borderBottomColor: '#fff',
        borderWidth: 1,
        borderTopColor: '#738591'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '1%'
    },
    headerText: {
        color: '#fff',
        flexWrap: 'wrap',
        width: '90%'
    },
    table: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, borderBottomColor: '#5c6672', borderBottomWidth: 1 },
    /*    'table:last-child': {
           borderBottomWidth: 0
       }, */
    tableNoBorder: {
        borderBottomWidth: 0
    },
    pic: {
        width: '100%',
        resizeMode: 'contain',
    },
    tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
});

//make this component available to the app
export default Accordions;

