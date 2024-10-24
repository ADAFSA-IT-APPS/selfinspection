import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComp from '../src/Components/ModalComp';
import { FontFamily, Colors } from '../src/Util/CommonStyle';
import { useNavigation } from '@react-navigation/native';

const AccordionContent = ({ question, DataInner,index,currentIndex,onPress }) => {
    //const [currentIndex, setCurrentIndex] = React.useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    console.log('index', index)
    return (
        <View>
            <TouchableOpacity key={index} onPress={onPress}>
                <View style={styles.headerCont}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{question}</Text>
                        {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
                    </View>
                </View>

                {index === currentIndex && (
                    <View style={{}} >
                        <View style={{ padding: 10 }}>
                            {DataInner.map((item, i) => (
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={{ color: Colors.primary, paddingBottom: 2 }}>{item.question}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('HygieneManual', { header: item.question, item: item.DataInnerLayer })} style={{ backgroundColor: Colors.primary, width: '30%', alignItems: 'center', borderRadius: 10 }}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20
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


export default AccordionContent;
