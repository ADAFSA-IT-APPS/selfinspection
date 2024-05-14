import React, { useState } from "react";
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { height, width } from '../../Util/CommonStyle/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toast, getUserdetails } from '../../Util/CommonStyle';
import Toast from 'react-native-root-toast';


// create a component
const CommentModal = ({ defaultValue, visible, parentIndex, childIndex, onClose, onsubmit, numeric, graceIndex, grace }) => {
    const [comment, setComment] = useState('');
    /*  const _check = () => {
 
     } */
    const handleClose = () => {
        console.log('close called', graceIndex);
        onClose()
    }
    const handleOnChangeComment = (text) => {
        setComment(text);
        // console.log('text', comment);
    }

    const handleSubmit = () => {

        if (!comment.trim()) {
            Toast.show('Please enter Comment', {
                duration: Toast.durations.SHORT,
                position: 50,
            })
        }
        // console.log('parentbouwbclwjebc', parentIndex)
        // console.log('bouwbclwjebc', childIndex)
        onsubmit(comment, parentIndex, childIndex);
        setComment('');
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={
                    onClose
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {grace &&
                            <Text style={{ fontWeight: '600', fontSize: 16 }}>Check list message</Text>}

                        <TextInput
                            multiline
                            color='#000'
                            // defaultValue={defaultValue}
                            placeholder={numeric ? 'Enter Grace less than 30' : `Enter Comment`}
                            textAlign={'center'} style={{ textAlignVertical: 'top' }}
                            value={defaultValue || comment}
                            keyboardType={numeric && 'numeric'}
                            onChangeText={(text) => handleOnChangeComment(text)}
                            style={{ height: '60%', width: width / 2, fontSize: 14 }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'/* , width: width / 1.4 */ }}>
                            {!defaultValue && <TouchableOpacity onPress={handleSubmit} style={styles.icon}>
                                <MaterialCommunityIcons style={{}} name={'check'} color='#5d6674' size={25} />
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={handleClose} style={styles.icon}>
                                <MaterialCommunityIcons onPress={onClose} style={{}} name={'close'} color='#5d6674' size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: '#fff',
        height: height / 4,
        borderRadius: 20,
        borderColor: '#5d6674',
        borderWidth: 1,
        padding: 15,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },


    icon: {
        borderColor: 'gray',
        borderWidth: 1, paddingHorizontal: width / 10, borderRadius: 5, marginHorizontal: 5
    }
});

//make this component available to the app
export default CommentModal;
